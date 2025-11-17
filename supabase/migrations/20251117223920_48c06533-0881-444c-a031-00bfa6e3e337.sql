-- First, ensure there are no NULL user_id values
-- If any exist, this will fail and prevent the migration
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.members WHERE user_id IS NULL) THEN
    RAISE EXCEPTION 'Cannot proceed: members table contains NULL user_id values. Please fix data before migration.';
  END IF;
END $$;

-- Make user_id NOT NULL to enforce referential integrity
ALTER TABLE public.members 
  ALTER COLUMN user_id SET NOT NULL;

-- Add unique constraint to prevent duplicate memberships per user
ALTER TABLE public.members 
  ADD CONSTRAINT members_user_id_unique UNIQUE (user_id);

-- Update RLS policies to be more robust
-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own membership" ON public.members;
DROP POLICY IF EXISTS "Users can update their own membership" ON public.members;
DROP POLICY IF EXISTS "Users can view their own membership" ON public.members;

-- Recreate INSERT policy with additional checks
CREATE POLICY "Users can insert their own membership"
ON public.members
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND user_id IS NOT NULL
);

-- Recreate SELECT policy
CREATE POLICY "Users can view their own membership"
ON public.members
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
  AND user_id IS NOT NULL
);

-- Recreate UPDATE policy - only allow updating non-critical fields
CREATE POLICY "Users can update their own membership"
ON public.members
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  AND user_id IS NOT NULL
  -- Prevent users from changing their user_id
  AND user_id = (SELECT user_id FROM public.members WHERE id = members.id)
);