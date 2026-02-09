/**
 * Single source of truth for all service video IDs (Google Drive).
 * Used by: ServiceVideoModal, ServicePageHero, ServiceDetail.
 */
export const SERVICE_VIDEO_BY_SLUG: Record<string, string> = {
  'content-production': '11TCn7_cr1UDvJbkx2X56uWUAFI_jB_Wb',
  'business-website': '11p_gT9XF6BIb-cGPiOByzO4yvUPzf0cS',
  'reputation': '15w6eWE3mjjXaeF-__3pIN6Bnh8GYfQA3',
  'seo': '1Ow1Gd4kxTyCbfxqcXjSk3q4-tT7xtI5F',
  'ads-management': '1QWhhP5W5gG2kdagjARdFcssNZK9LMWMX',
  'ecommerce-website': '1jJgIkhbQT69N1iXKEjLiz-eZp8CVemio',
  'one-page-website': '1ndZjHgg2usSrSXbuW-r4hA1NqbuirXvw',
  'social-media': '1Nhf9_ZjyDWE2kxlBfGnAu0UCmrCb6j_l',
  'mobile-app-development': '10hluiBfJuByaxHcwZQbMgS4uXMxp_cty',
  'data-sync': '1d_3vQbZlcg1LwHcpRR2Awb1HruGuw20O',
};

export function buildDrivePreviewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function buildDriveViewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

export function getVideoIdBySlug(slug: string): string | undefined {
  const id = SERVICE_VIDEO_BY_SLUG[slug];
  return id || undefined; // Return undefined for empty strings too
}
