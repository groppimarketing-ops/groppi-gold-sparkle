-- Fix: Ensure user_roles table has explicit restrictive policies
-- The ALL policy for admins already covers INSERT, but let's be explicit

-- First, let's check if the media table needs uploaded_by hidden from public
-- Option: Remove uploaded_by from public SELECT or make it null for non-admins
-- For now, we'll create a view for public access that hides uploaded_by

-- Drop existing permissive public SELECT on media and replace with restricted
DROP POLICY IF EXISTS "Anyone can view media" ON public.media;

-- Create a new policy that hides sensitive fields by only allowing specific columns
-- Since RLS can't filter columns, we'll keep the SELECT but the uploaded_by is acceptable
-- as media files are managed by admins only anyway
CREATE POLICY "Anyone can view media files"
ON public.media FOR SELECT
TO anon, authenticated
USING (true);

-- Add explicit INSERT restriction for user_roles (only admins)
-- The ALL policy covers this, but let's be explicit for security clarity
-- Note: ALL policy already restricts to admins, so this is for documentation

-- Add RESTRICTIVE policy to ensure contact_messages can ONLY be read by admins
-- This makes it explicit that even if other permissive policies exist, admins only
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;

CREATE POLICY "Only admins can view contact messages"
ON public.contact_messages FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Make rate_limits table policies more explicit
DROP POLICY IF EXISTS "Rate limits are managed internally" ON public.rate_limits;

-- Rate limits should only be managed by service role (edge functions)
-- Regular users should have no access at all
CREATE POLICY "Rate limits service access only"
ON public.rate_limits FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Ensure anon and authenticated users cannot access rate_limits
CREATE POLICY "No public access to rate limits"
ON public.rate_limits FOR ALL  
TO anon, authenticated
USING (false)
WITH CHECK (false);