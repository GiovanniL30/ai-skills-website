import Link from 'next/link';

import { CodeBlock } from '@/components/code-block';
import { CommandBuilder } from '@/components/command-builder';
import { DocSection } from '@/components/doc-section';
import { PageHeading } from '@/components/page-heading';
import { cliDocumentationUrl, buildInstallCommand, listSkillsCommand } from '@/lib/installation';
import { createPageMetadata } from '@/lib/site';
import { installationSource, skills } from '@/lib/skills';

export const metadata = createPageMetadata(
  'Installation',
  'Install Agent Skills into a project or coding environment. Choose a skill, coding agent, and scope, then copy the command and confirm discovery.',
  '/installation'
);

const steps = [
  {
    title: 'Open a terminal in the target project',
    text: 'Project scope installs into the repository you are working in. Start from its root directory.',
  },
  {
    title: 'Run the installation command',
    text: 'List the available packages or use the command builder below to install one selected skill.',
  },
  {
    title: 'Select your coding agent if prompted',
    text: 'With Interactive selected, follow the installer’s prompts. An explicit agent selection uses its agent ID and full file copies.',
  },
  {
    title: 'Open or refresh the agent session',
    text: 'Open your coding tool in the target project. Restart or refresh the session if its skill discovery is stale.',
  },
  {
    title: 'Confirm the skill is available',
    text: 'Check the agent’s skill list or picker. File installation alone does not prove the agent has discovered or loaded the workflow.',
  },
  {
    title: 'Give the agent a concrete task',
    text: 'Name the skill and describe the requested behavior, constraints, and expected result. The use cases page has prompts you can adapt.',
  },
];

export default function InstallationPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-w-0 flex-col gap-12 px-5 py-10 sm:px-8 sm:py-12 lg:px-10"
    >
      <PageHeading
        eyebrow="GET STARTED"
        title="Install a skill. Give it a task."
        description="Skills extend coding-agent workflows with reusable instructions, focused references, and optional helpers. Install them into a project or your coding environment, then ask your agent to use one."
      />
      <div className="flex max-w-4xl flex-col gap-12">
        <DocSection id="prerequisites" title="Before you start">
          <ul className="flex list-disc flex-col gap-3 pl-5 leading-7 text-muted-foreground">
            <li>A coding agent that supports Agent Skills and access to the target repository.</li>
            <li>
              Node.js and npm for the npx installer, plus network access to GitHub and the npm
              registry. The source repository’s tested skills@1.7.1 installer requires Node.js
              22.20.0 or newer; use a current Node.js LTS release and check the CLI’s current
              requirements.
            </li>
            <li>Permission to write to the selected project or user skill directory.</li>
          </ul>
          <p className="leading-7 text-muted-foreground">
            The Markdown workflows do not need the source repository’s maintainer dependencies.
            Optional bundled helpers need Node.js 18+; running a target project’s checks also needs
            that project’s tooling.
          </p>
        </DocSection>
        <DocSection id="available-skills" title="List the available skills">
          <p className="leading-7 text-muted-foreground">
            Use the{' '}
            <a href={installationSource} className="text-foreground underline underline-offset-4">
              central skills directory
            </a>{' '}
            to list the five shipping packages. The listing command does not install them.
          </p>
          <CodeBlock value={listSkillsCommand} label="List available skills" />
          <p className="text-sm leading-7 text-muted-foreground">
            To install one package with interactive prompts:
          </p>
          <CodeBlock
            value={buildInstallCommand('understanding-codebases')}
            label="Install Understanding Codebases"
          />
        </DocSection>
        <DocSection id="command-builder" title="Build your command">
          <p className="leading-7 text-muted-foreground">
            Choose the workflow you need. Project scope keeps the installation with the target
            repository; global scope makes it available in your user environment.
          </p>
          <CommandBuilder options={skills.map(({ slug, title }) => ({ slug, title }))} />
          <p className="text-sm leading-7 text-muted-foreground">
            Source and flags follow the{' '}
            <a href={cliDocumentationUrl} className="text-foreground underline underline-offset-4">
              official skills CLI documentation
            </a>
            . The generated command uses the current npx release and keeps confirmation prompts
            enabled.
          </p>
        </DocSection>
        <DocSection id="next-steps" title="From installation to your first task">
          <ol className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border font-mono text-sm"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="leading-7 text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            href="/use-cases"
            className="w-fit rounded-sm font-medium underline underline-offset-4"
          >
            Choose a task and copy an example prompt →
          </Link>
        </DocSection>
        <DocSection id="windows" title="Windows and manual installation">
          <p className="leading-7 text-muted-foreground">
            If PowerShell blocks the npx.ps1 wrapper, use{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">npx.cmd</code> in
            place of npx. The rest of the command stays the same; no execution-policy change is
            needed.
          </p>
          <p className="leading-7 text-muted-foreground">
            For manual installation, copy the entire selected skill directory, including its
            SKILL.md, references, scripts, and assets, to a location supported by your agent. Keep
            the original package name. Copying only SKILL.md breaks the package’s supporting paths.
          </p>
          <p className="leading-7 text-muted-foreground">
            Project instructions describe the rules of a repository; skills describe how to perform
            recurring work. Mentioning a skill in AGENTS.md does not install it or guarantee
            activation. See the{' '}
            <a
              href="https://github.com/GiovanniL30/ai-skills#installation"
              className="text-foreground underline underline-offset-4"
            >
              source installation guide
            </a>{' '}
            for discovery locations and recorded verification limits.
          </p>
        </DocSection>
      </div>
    </main>
  );
}
