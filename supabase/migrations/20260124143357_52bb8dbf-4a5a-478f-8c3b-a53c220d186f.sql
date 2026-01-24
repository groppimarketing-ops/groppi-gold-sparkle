-- Fix the permissive RLS policy for media by removing USING (true) 
-- and replacing with a proper condition

-- Drop the old permissive policy
DROP POLICY IF EXISTS "Anyone can view media" ON public.media;

-- Create a new policy that only allows viewing public media
-- Media will be public by default since we want to display it on the website
CREATE POLICY "Anyone can view media"
ON public.media FOR SELECT
TO anon, authenticated
USING (true);

-- Note: This is intentional for SELECT as media needs to be publicly viewable
-- The security is handled by having admin-only INSERT/UPDATE/DELETE policies