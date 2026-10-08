import { siteUrl } from '@/lib/site';
import { skills } from '@/lib/skills';
import { tutorials } from '@/lib/tutorials';

import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    '/installation',
    '/use-cases',
    '/tutorials',
    ...skills.map((skill) => `/skills/${skill.slug}`),
    ...tutorials.map((tutorial) => tutorial.path),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
