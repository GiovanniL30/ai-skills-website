import Link from 'next/link';

import { PageHeading } from '@/components/page-heading';
import { createPageMetadata } from '@/lib/site';
import { tutorials } from '@/lib/tutorials';

export const metadata = createPageMetadata(
  'Tutorials',
  'Step-by-step guides that combine Agent Skills with real project setup tasks, starting with creating a specialized subagent.',
  '/tutorials'
);

export default function TutorialsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-w-0 flex-col gap-12 px-5 py-10 sm:px-8 sm:py-12 lg:px-10"
    >
      <PageHeading
        eyebrow="STEP BY STEP"
        title="Tutorials"
        description="Practical walkthroughs that put the skills to work in a real repository. Each tutorial explains the concepts, shows the exact prompts, and tells you what to do next."
      />
      <div className="flex max-w-3xl flex-col gap-8">
        {tutorials.map((tutorial, index) => (
          <section
            key={tutorial.slug}
            aria-labelledby={`tutorial-${tutorial.slug}`}
            className="flex min-w-0 flex-col gap-4 border-t border-border pt-8"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {String(index + 1).padStart(2, '0')} / Tutorial
            </p>
            <h2 id={`tutorial-${tutorial.slug}`} className="text-2xl font-semibold tracking-tight">
              <Link
                href={tutorial.path}
                className="rounded-sm underline underline-offset-4 hover:text-muted-foreground"
              >
                {tutorial.title}
              </Link>
            </h2>
            <p className="leading-7 text-muted-foreground">{tutorial.summary}</p>
            <Link
              href={tutorial.path}
              className="w-fit rounded-sm text-sm font-medium underline underline-offset-4"
            >
              Start the tutorial →
            </Link>
          </section>
        ))}
      </div>
    </main>
  );
}
