-- Create admin-only table for payment data
CREATE TABLE public.member_payment_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS but with NO policies - only service role can access
ALTER TABLE public.member_payment_data ENABLE ROW LEVEL SECURITY;

-- Add trigger for updated_at
CREATE TRIGGER update_member_payment_data_updated_at
BEFORE UPDATE ON public.member_payment_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Remove sensitive Stripe columns from members table
ALTER TABLE public.members DROP COLUMN IF EXISTS stripe_customer_id;
ALTER TABLE public.members DROP COLUMN IF EXISTS stripe_subscription_id;