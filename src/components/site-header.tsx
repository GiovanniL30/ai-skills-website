import { ExternalLinkIcon, TerminalIcon } from 'lucide-react';
import Link from 'next/link';

import { MobileNavigation } from '@/components/mobile-navigation';
import { repositoryUrl, skills } from '@/lib/skills';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="mx-auto flex min-h-16 max-w-screen-2xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="inline-flex min-h-11 items-center gap-3 rounded-sm font-semibold">
          <TerminalIcon aria-hidden="true" className="size-5" />
          Agent Skills
        </Link>
        <div className="hidden items-center gap-5 lg:flex">
          <p className="text-sm text-muted-foreground">A practical toolkit for AI coding</p>
          <a
            href={repositoryUrl}
            aria-label="Agent Skills source on GitHub"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:bg-muted"
          >
            <ExternalLinkIcon aria-hidden="true" className="size-5" />
          </a>
        </div>
        <div className="lg:hidden">
          <MobileNavigation skillLinks={skills.map(({ slug, title }) => ({ slug, title }))} />
        </div>
      </div>
    </header>
  );
}
