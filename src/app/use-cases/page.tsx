import Link from 'next/link';

import { PageHeading } from '@/components/page-heading';
import { UseCaseExample } from '@/components/use-case-example';
import { createPageMetadata } from '@/lib/site';
import { skills } from '@/lib/skills';

export const metadata = createPageMetadata(
  'Use Cases',
  'Find the right skill for an unfamiliar repository, a feature, a failing test, an interface, or project setup. Copy a practical prompt for your coding agent.',
  '/use-cases'
);

export default function UseCasesPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-w-0 flex-col gap-12 px-5 py-10 sm:px-8 sm:py-12 lg:px-10"
    >
      <PageHeading
        eyebrow="PUT SKILLS TO WORK"
        title="Start with the task at hand."
        description="Match your situation to a workflow, then give your agent a concrete request. These example prompts are starting points: adapt the task and constraints to your own repository."
      />
      <div className="flex max-w-3xl flex-col gap-12">
        {skills.map((skill, index) => (
          <section
            key={skill.slug}
            aria-labelledby={`case-${skill.slug}`}
            className="flex min-w-0 scroll-mt-24 flex-col gap-6 border-t border-border pt-8"
            id={skill.slug}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id={`case-${skill.slug}`} className="text-sm font-medium text-muted-foreground">
                {String(index + 1).padStart(2, '0')} / Recommended skill:{' '}
                <Link
                  href={`/skills/${skill.slug}`}
                  className="rounded-sm text-foreground underline underline-offset-4"
                >
                  {skill.title}
                </Link>
              </h2>
            </div>
            <UseCaseExample useCase={skill.useCases[0]} />
            <Link
              href={`/skills/${skill.slug}#use-cases`}
              className="w-fit rounded-sm text-sm font-medium underline underline-offset-4"
            >
              Explore this skill and more examples →
            </Link>
          </section>
        ))}
      </div>
    </main>
  );
}
