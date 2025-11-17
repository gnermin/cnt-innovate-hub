-- Remove sensitive Stripe columns from members table
ALTER TABLE public.members DROP COLUMN IF EXISTS stripe_customer_id;
ALTER TABLE public.members DROP COLUMN IF EXISTS stripe_subscription_id;