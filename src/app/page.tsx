import Link from 'next/link';

import { PageHeading } from '@/components/page-heading';
import { SkillCard } from '@/components/skill-card';
import { SkillCatalog } from '@/components/skill-catalog';
import { createPageMetadata, siteDescription } from '@/lib/site';
import { getSearchText, skills } from '@/lib/skills';

export const metadata = createPageMetadata('Skills for your coding agent', siteDescription, '/');

export default function HomePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-w-0 flex-col gap-12 px-5 py-10 sm:px-8 sm:py-12 lg:px-10"
    >
      <PageHeading
        eyebrow="THE CATALOG"
        title="Skills for your coding agent"
        description="Five reusable workflows for the work around writing code: understand a repository, implement a feature, debug a defect, design an interface, and prepare your project."
      >
        <p className="text-sm leading-7 text-muted-foreground">
          Choose a skill for your next task.{' '}
          <Link
            href="/installation"
            className="rounded-sm font-medium text-foreground underline underline-offset-4"
          >
            Start with installation
          </Link>{' '}
          or{' '}
          <Link
            href="/use-cases"
            className="rounded-sm font-medium text-foreground underline underline-offset-4"
          >
            explore practical use cases
          </Link>
          .
        </p>
      </PageHeading>
      <SkillCatalog
        entries={skills.map((skill) => ({
          slug: skill.slug,
          category: skill.category,
          searchText: getSearchText(skill),
          card: <SkillCard skill={skill} />,
        }))}
      />
    </main>
  );
}
