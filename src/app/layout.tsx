import { Navigation } from '@/components/navigation';
import { SiteHeader } from '@/components/site-header';
import { siteDescription, siteUrl } from '@/lib/site';
import { repositoryUrl, skills } from '@/lib/skills';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Agent Skills',
    template: '%s | Agent Skills',
  },
  description: siteDescription,
};

const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html lang="en">
      <body className="min-h-svh bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div className="mx-auto min-h-[calc(100svh-4rem)] max-w-screen-2xl lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside
            aria-label="Sidebar"
            className="sticky top-16 hidden h-[calc(100svh-4rem)] overflow-y-auto border-r border-border px-5 py-8 lg:block"
          >
            <Navigation skillLinks={skills.map(({ slug, title }) => ({ slug, title }))} />
          </aside>
          <div className="flex min-w-0 flex-col">
            {children}
            <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-6 text-sm text-muted-foreground sm:px-8 lg:px-10">
              <p>Agent Skills · Practical coding workflows</p>
              <a href={repositoryUrl} className="rounded-sm underline underline-offset-4">
                Browse the source repository
              </a>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
