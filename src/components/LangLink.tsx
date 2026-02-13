import { forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useLangPath } from '@/hooks/useLangPath';

/**
 * Drop-in replacement for react-router <Link> that automatically
 * prefixes the `to` path with the current language segment.
 *
 * Only transforms string paths starting with "/".
 * External URLs and hash-only links are passed through unchanged.
 */
const LangLink = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => {
  const langPath = useLangPath();

  const resolvedTo = typeof to === 'string' && to.startsWith('/')
    ? langPath(to)
    : to;

  return <Link ref={ref} to={resolvedTo} {...props} />;
});

LangLink.displayName = 'LangLink';

export default LangLink;
