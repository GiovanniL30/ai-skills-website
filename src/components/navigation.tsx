'use client';

import {
  BookOpenIcon,
  DownloadIcon,
  ExternalLinkIcon,
  GraduationCapIcon,
  LayersIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { repositoryUrl } from '@/lib/skills';
import { cn } from '@/lib/utils';

interface NavigationProps {
  skillLinks: { slug: string; title: string }[];
  onNavigate?: () => void;
}

const primaryLinks = [
  { href: '/', title: 'All Skills', icon: LayersIcon },
  { href: '/installation', title: 'Installation', icon: DownloadIcon },
  { href: '/use-cases', title: 'Use Cases', icon: BookOpenIcon },
  { href: '/tutorials', title: 'Tutorials', icon: GraduationCapIcon },
];

export const Navigation = ({ skillLinks, onNavigate }: NavigationProps) => {
  const pathname = usePathname();
  const linkClasses =
    'flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm leading-5 transition-colors hover:bg-muted';
  return (
    <nav aria-label="Documentation" className="flex flex-col gap-7">
      <div className="flex flex-col gap-1">
        {primaryLinks.map(({ href, title, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={pathname === href ? 'page' : undefined}
            className={cn(linkClasses, pathname === href && 'bg-muted font-medium')}
          >
            <Icon aria-hidden="true" className="size-4 shrink-0" />
            {title}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="px-3 text-xs font-medium text-muted-foreground">THE SKILLS</p>
        <div className="flex flex-col gap-1">
          {skillLinks.map(({ slug, title }) => (
            <Link
              key={slug}
              href={`/skills/${slug}`}
              onClick={onNavigate}
              aria-current={pathname === `/skills/${slug}` ? 'page' : undefined}
              className={cn(linkClasses, pathname === `/skills/${slug}` && 'bg-muted font-medium')}
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
      <a
        href={repositoryUrl}
        className={cn(linkClasses, 'text-muted-foreground')}
        onClick={onNavigate}
      >
        <ExternalLinkIcon aria-hidden="true" className="size-4" />
        View on GitHub
      </a>
    </nav>
  );
};
