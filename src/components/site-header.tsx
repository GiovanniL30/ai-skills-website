import { TerminalIcon } from 'lucide-react';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-20 max-w-6xl items-center px-6 sm:px-10">
        <Link href="/" className="inline-flex min-h-11 items-center gap-3 rounded-sm font-semibold">
          <TerminalIcon aria-hidden="true" className="size-5" />
          Agent Skills
        </Link>
      </div>
    </header>
  );
}
