import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { trackEvent, socialLinks as socialUrls } from '@/utils/tracking';

// Brand color social icons
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

// Social media data with brand colors - exported for reuse
export const socialIconsData = [
  { 
    icon: XIcon, 
    href: socialUrls.twitter, 
    label: 'X (Twitter)', 
    ariaLabel: 'Groppi on X (Twitter)',
    event: 'twitter_click' as const,
    color: '#1DA1F2',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(29,161,242,0.5)]'
  },
  { 
    icon: FacebookIcon, 
    href: socialUrls.facebook, 
    label: 'Facebook', 
    ariaLabel: 'Groppi on Facebook',
    event: 'facebook_click' as const,
    color: '#1877F2',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(24,119,242,0.5)]'
  },
  { 
    icon: InstagramIcon, 
    href: socialUrls.instagram, 
    label: 'Instagram', 
    ariaLabel: 'Groppi on Instagram',
    event: 'instagram_click' as const,
    color: '#E4405F',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(228,64,95,0.5)]'
  },
  { 
    icon: LinkedInIcon, 
    href: socialUrls.linkedin, 
    label: 'LinkedIn', 
    ariaLabel: 'Groppi on LinkedIn',
    event: 'linkedin_click' as const,
    color: '#0A66C2',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(10,102,194,0.5)]'
  },
  { 
    icon: YouTubeIcon, 
    href: socialUrls.youtube, 
    label: 'YouTube', 
    ariaLabel: 'Groppi on YouTube',
    event: 'youtube_click' as const,
    color: '#FF0000',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(255,0,0,0.5)]'
  },
  { 
    icon: TikTokIcon, 
    href: socialUrls.tiktok, 
    label: 'TikTok', 
    ariaLabel: 'Groppi on TikTok',
    event: 'tiktok_click' as const,
    color: '#69C9D0',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(105,201,208,0.5)]'
  },
  { 
    icon: PinterestIcon, 
    href: socialUrls.pinterest, 
    label: 'Pinterest', 
    ariaLabel: 'Groppi on Pinterest',
    event: 'pinterest_click' as const,
    color: '#E60023',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(230,0,35,0.5)]'
  },
];

interface SocialIconsPillProps {
  location: 'header' | 'footer';
  iconSize?: string;
  showTooltips?: boolean;
  className?: string;
}

const SocialIconsPill = ({ 
  location, 
  iconSize = 'h-[18px] w-[18px]',
  showTooltips = true,
  className = ''
}: SocialIconsPillProps) => {
  const pillStyles = {
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 200, 60, 0.18)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  };

  const renderIcon = (social: typeof socialIconsData[0]) => (
    <a
      key={social.label}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.ariaLabel}
      onClick={() => trackEvent({ event: social.event, location })}
      className={`social-icon-glow flex items-center justify-center hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded ${social.hoverGlow}`}
      style={{ color: social.color }}
    >
      <social.icon className={iconSize} />
    </a>
  );

  if (showTooltips) {
    return (
      <TooltipProvider delayDuration={300}>
        <div 
          className={`flex items-center gap-3 px-3 py-2 rounded-full backdrop-blur-[10px] shadow-sm ${className}`}
          style={pillStyles}
        >
          {socialIconsData.map((social) => (
            <Tooltip key={social.label}>
              <TooltipTrigger asChild>
                {renderIcon(social)}
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {social.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    );
  }

  return (
    <div 
      className={`flex items-center gap-3 px-3 py-2 rounded-full backdrop-blur-[10px] shadow-sm ${className}`}
      style={pillStyles}
    >
      {socialIconsData.map(renderIcon)}
    </div>
  );
};

export default SocialIconsPill;
