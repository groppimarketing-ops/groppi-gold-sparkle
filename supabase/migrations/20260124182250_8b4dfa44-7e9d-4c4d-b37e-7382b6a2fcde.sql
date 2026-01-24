-- Fix rate_limits table - remove the service_role policy and keep only the deny policy
-- Service role bypasses RLS by default, so we don't need an explicit policy for it
DROP POLICY IF EXISTS "Rate limits service access only" ON public.rate_limits;

-- Add INSERT policy for profiles table
-- This is needed for the handle_new_user trigger to work properly
CREATE POLICY "Users can create their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);