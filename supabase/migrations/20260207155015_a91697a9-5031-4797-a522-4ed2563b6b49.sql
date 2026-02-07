
-- Drop the overly permissive policy
DROP POLICY "Service role can manage newsletter subscribers" ON public.newsletter_subscribers;

-- No public insert/update/delete policies needed - the edge function uses service role key which bypasses RLS
-- Only admins can view/manage subscribers
CREATE POLICY "Admins can manage newsletter subscribers"
ON public.newsletter_subscribers
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
