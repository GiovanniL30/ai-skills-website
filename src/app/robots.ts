import { siteUrl } from '@/lib/site';

import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml` };
};

export default robots;
