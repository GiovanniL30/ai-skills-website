import { siteUrl } from '@/lib/site';
import { skills } from '@/lib/skills';

import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    '/installation',
    '/use-cases',
    ...skills.map((skill) => `/skills/${skill.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
