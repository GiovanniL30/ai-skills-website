import type { Metadata } from 'next';

const configuredUrl = new URL(process.env.SITE_URL ?? 'http://localhost:3000');
if (!['http:', 'https:'].includes(configuredUrl.protocol))
  throw new Error('SITE_URL must be an HTTP or HTTPS URL.');
if (
  configuredUrl.username ||
  configuredUrl.password ||
  configuredUrl.pathname !== '/' ||
  configuredUrl.search ||
  configuredUrl.hash
)
  throw new Error(
    'SITE_URL must be a site origin, without credentials, a path, query, or fragment.'
  );

export const siteUrl = configuredUrl.origin;
export const siteDescription =
  'Practical workflows for AI coding agents. Explore five skills for understanding code, implementing features, debugging, frontend design, and project setup.';

export function createPageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteUrl}${path}`;
  const pageTitle = `${title} | Agent Skills`;
  return {
    title: { absolute: pageTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: 'Agent Skills',
      type: 'website',
      locale: 'en_US',
    },
    twitter: { card: 'summary', title: pageTitle, description },
  };
}
