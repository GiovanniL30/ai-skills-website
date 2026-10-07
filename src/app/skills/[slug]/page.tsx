import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CodeBlock } from '@/components/code-block';
import { DocSection } from '@/components/doc-section';
import { PageHeading } from '@/components/page-heading';
import { Badge } from '@/components/ui/badge';
import { UseCaseExample } from '@/components/use-case-example';
import { buildInstallCommand } from '@/lib/installation';
import { createPageMetadata } from '@/lib/site';
import { getPackageFileUrl, getSkill, skills } from '@/lib/skills';

export const dynamicParams = false;

export function generateStaticParams() {
  return skills.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/skills/[slug]'>) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();
  return createPageMetadata(skill.title, skill.summary, `/skills/${skill.slug}`);
}

const sections = [
  { id: 'when-to-use', title: 'When to use it' },
  { id: 'workflow', title: 'Workflow' },
  { id: 'use-cases', title: 'Use cases and prompts' },
  { id: 'expected-outputs', title: 'Expected outputs' },
  { id: 'requirements', title: 'Requirements and helpers' },
  { id: 'installation', title: 'Installation' },
  { id: 'related-skills', title: 'Related skills' },
  { id: 'source', title: 'Source and references' },
];

function TableOfContents() {
  return (
    <nav aria-label="On this page">
      <ul className="flex flex-col gap-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="block rounded-sm py-2 text-sm leading-5 text-muted-foreground hover:text-foreground"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function SkillPage({ params }: PageProps<'/skills/[slug]'>) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();
  return (
    <main id="main-content" tabIndex={-1} className="min-w-0 px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/"
              className="rounded-sm hover:text-foreground underline underline-offset-4"
            >
              All Skills
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{skill.title}</li>
        </ol>
      </nav>
      <div className="grid min-w-0 gap-12 xl:grid-cols-[minmax(0,1fr)_180px]">
        <div className="flex min-w-0 max-w-3xl flex-col gap-12">
          <PageHeading eyebrow="SKILL GUIDE" title={skill.title} description={skill.summary}>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline">{skill.category}</Badge>
              <code className="font-mono text-sm text-muted-foreground [overflow-wrap:anywhere]">
                {skill.packageName}
              </code>
            </div>
          </PageHeading>
          <details className="rounded-lg border border-border px-4 py-3 xl:hidden">
            <summary className="min-h-8 cursor-pointer font-medium">On this page</summary>
            <div className="pt-3">
              <TableOfContents />
            </div>
          </details>
          <DocSection id="when-to-use" title="When to use it">
            <ul className="flex list-disc flex-col gap-3 pl-5 leading-7 text-muted-foreground">
              {skill.whenToUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </DocSection>
          <DocSection id="workflow" title="Workflow">
            <ol className="flex flex-col gap-6">
              {skill.workflow.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="font-mono text-sm text-muted-foreground" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="leading-7 text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </DocSection>
          <DocSection id="use-cases" title="Practical use cases and prompts">
            <div className="flex flex-col gap-10">
              {skill.useCases.map((useCase) => (
                <UseCaseExample key={useCase.title} useCase={useCase} />
              ))}
            </div>
          </DocSection>
          <DocSection id="expected-outputs" title="Expected outputs">
            <ul className="flex list-disc flex-col gap-3 pl-5 leading-7 text-muted-foreground">
              {skill.expectedOutputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </DocSection>
          <DocSection id="requirements" title="Requirements and optional helpers">
            <ul className="flex list-disc flex-col gap-3 pl-5 leading-7 text-muted-foreground">
              {skill.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {skill.helpers.map((helper) => (
              <div key={helper.path} className="flex flex-col gap-2">
                <h3 className="font-medium">
                  <a
                    href={getPackageFileUrl(skill, helper.path)}
                    className="rounded-sm underline underline-offset-4"
                  >
                    {helper.title}
                  </a>
                </h3>
                <p className="leading-7 text-muted-foreground">{helper.description}</p>
              </div>
            ))}
          </DocSection>
          <DocSection id="installation" title="Installation">
            <p className="leading-7 text-muted-foreground">
              Open a terminal in your target project and install this package. Project scope is the
              default; choose your agent when prompted.
            </p>
            <CodeBlock
              value={buildInstallCommand(skill.packageName)}
              label={`Install ${skill.title}`}
            />
            <p className="leading-7 text-muted-foreground">
              Refresh your agent session, confirm the skill is available, and give it a concrete
              task. Keep the whole package, including references and helpers.
            </p>
            <Link
              href="/installation#command-builder"
              className="w-fit rounded-sm text-sm font-medium underline underline-offset-4"
            >
              Choose an agent and installation scope →
            </Link>
          </DocSection>
          <DocSection id="related-skills" title="Related skills">
            <ul className="flex flex-col gap-5">
              {skill.relatedSkills.map((relatedSlug) => {
                const related = getSkill(relatedSlug);
                return related ? (
                  <li key={related.slug} className="flex flex-col gap-2">
                    <Link
                      href={`/skills/${related.slug}`}
                      className="w-fit rounded-sm font-medium underline underline-offset-4"
                    >
                      {related.title}
                    </Link>
                    <p className="text-sm leading-7 text-muted-foreground">{related.summary}</p>
                  </li>
                ) : null;
              })}
            </ul>
          </DocSection>
          <DocSection id="source" title="Source and focused references">
            <p className="leading-7 text-muted-foreground">
              This guide summarizes the original package. Read its complete workflow and supporting
              references on GitHub.
            </p>
            <a
              href={skill.sourceUrl}
              className="w-fit rounded-sm font-medium underline underline-offset-4"
            >
              Read the original SKILL.md ↗
            </a>
            <ul className="flex flex-col gap-3">
              {skill.references.map((reference) => (
                <li key={reference.path}>
                  <a
                    href={getPackageFileUrl(skill, reference.path)}
                    className="rounded-sm text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    {reference.title}
                  </a>
                </li>
              ))}
            </ul>
          </DocSection>
        </div>
        <aside className="sticky top-24 hidden self-start xl:block">
          <p className="mb-4 text-sm font-medium">On this page</p>
          <TableOfContents />
        </aside>
      </div>
    </main>
  );
}
