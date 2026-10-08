import Link from 'next/link';

import { CodeBlock } from '@/components/code-block';
import { DocSection } from '@/components/doc-section';
import { PageHeading } from '@/components/page-heading';
import { buildInstallCommand } from '@/lib/installation';
import { createPageMetadata } from '@/lib/site';
import { repositoryUrl } from '@/lib/skills';

export const metadata = createPageMetadata(
  'How to Create a Subagent with an Agent Skill',
  'A beginner-friendly tutorial: install the setting-up-agentic-projects skill, ask it to configure a specialized reviewer subagent, and run it with the reviewing-code workflow.',
  '/tutorials/create-a-subagent-with-a-skill'
);

const setupSkillSlug = 'setting-up-agentic-projects';

const sections = [
  { id: 'concepts', title: 'Core concepts' },
  { id: 'install', title: '1. Install the setup skill' },
  { id: 'project', title: '2. Start with a normal project' },
  { id: 'setup-prompt', title: '3. Ask for a reviewer subagent' },
  { id: 'workflow', title: '4. What the setup skill does' },
  { id: 'together', title: '5. Skill and subagent together' },
  { id: 'run', title: '6. Run the subagent' },
  { id: 'architecture', title: '7. The resulting architecture' },
  { id: 'other-roles', title: '8. Other roles' },
  { id: 'tool-config', title: '9. Tool-specific configuration' },
  { id: 'no-duplication', title: '10. Do not duplicate Skills' },
  { id: 'when', title: '11. When you need a subagent' },
  { id: 'mistakes', title: '12. Common mistakes' },
  { id: 'pattern', title: '13. Quick reusable pattern' },
  { id: 'mental-model', title: '14. Final mental model' },
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

const mainSetupPrompt = `Use the setting-up-agentic-projects skill.

Prepare this repository for agentic development and create a
specialized code-reviewer subagent.

Requirements:

- Inspect the existing repository before making changes.
- Inspect the existing project instructions.
- Inspect the installed Agent Skills.
- Use the reviewing-code skill for the review workflow.
- Configure the reviewer as a specialized read-only role.
- The reviewer should focus on correctness, security, performance,
  maintainability, and regressions.
- The reviewer must not modify application code.
- Use the native subagent configuration supported by the coding tool
  currently being used.
- Verify the current official documentation before creating
  tool-specific configuration.
- Do not invent configuration paths or fields.
- Keep the setup minimal and avoid duplicating the skill contents.
- Verify that the resulting configuration is valid.
- Report which files were created or changed and why.`;

const reviewerTaskPrompt = `Use the reviewer subagent to review the current repository.

Follow the reviewing-code skill.

Review the latest changes for:

- correctness
- security
- performance
- maintainability
- regressions

Do not modify any files.

For every finding, provide:

1. Severity
2. File path
3. Line or relevant location
4. Problem
5. Why it matters
6. Suggested fix

Do not report speculative issues.

Finish with an overall assessment.`;

const frontendSetupPrompt = `Use the setting-up-agentic-projects skill.

Create a specialized frontend-design subagent for this project.

Requirements:

- Use the designing-frontend skill.
- Inspect the existing frontend architecture and design documentation.
- Make the role focused on UI/UX and frontend architecture.
- Do not modify application code during design review.
- Use the native subagent configuration for the current coding tool.
- Verify the official tool documentation before creating the configuration.
- Keep the role minimal and avoid duplicating the Skill.`;

const promptTemplate = `Use the setting-up-agentic-projects skill.

Create/configure a specialized [ROLE] subagent.

The subagent should:

- [RESPONSIBILITY]
- [RESPONSIBILITY]
- [RESPONSIBILITY]

Use the [SKILL-NAME] skill.

Permissions:

- [READ-ONLY / WRITE / OTHER]

Constraints:

- [CONSTRAINT]
- [CONSTRAINT]

Use the native configuration supported by the current coding tool.
Verify the current official documentation before generating
tool-specific configuration.

Keep the setup minimal and avoid duplicating the Skill.
Verify the resulting configuration.`;

const listStyle = 'flex list-disc flex-col gap-3 pl-5 leading-7 text-muted-foreground';
const orderedListStyle = 'flex list-decimal flex-col gap-3 pl-5 leading-7 text-muted-foreground';
const linkStyle = 'rounded-sm font-medium underline underline-offset-4';

export default function CreateSubagentTutorialPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-w-0 px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className={`rounded-sm hover:text-foreground ${linkStyle}`}>
              All Skills
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/tutorials" className={`rounded-sm hover:text-foreground ${linkStyle}`}>
              Tutorials
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Create a Subagent with a Skill</li>
        </ol>
      </nav>

      <div className="grid min-w-0 gap-12 xl:grid-cols-[minmax(0,1fr)_180px]">
        <div className="flex min-w-0 max-w-3xl flex-col gap-12">
          <PageHeading
            eyebrow="TUTORIAL"
            title="How to Create a Subagent with an Agent Skill"
            description="A practical, beginner-friendly walkthrough: install the setup skill, ask it to configure a specialized reviewer subagent, and give that subagent a reusable review workflow."
          >
            <div className="flex flex-wrap items-center gap-3">
              <Link href={`/skills/${setupSkillSlug}`} className={`${linkStyle} text-sm`}>
                Uses the Setting Up Agentic Projects skill →
              </Link>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              New to subagents? Start with the concepts below, then follow the parts in order.{' '}
              <Link href="/installation" className={linkStyle}>
                Installation basics
              </Link>{' '}
              and{' '}
              <Link href="/use-cases" className={linkStyle}>
                practical use cases
              </Link>{' '}
              are covered elsewhere on this site.
            </p>
          </PageHeading>

          <details className="rounded-lg border border-border px-4 py-3 xl:hidden">
            <summary className="min-h-8 cursor-pointer font-medium">On this page</summary>
            <div className="pt-3">
              <TableOfContents />
            </div>
          </details>

          <DocSection id="concepts" title="Core concepts">
            <p className="leading-7 text-muted-foreground">
              Before creating anything, it helps to separate four things that beginners often mix
              up. They are complementary, not interchangeable.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Agent Skill</h3>
                <p className="leading-7 text-muted-foreground">
                  A Skill teaches an AI agent{' '}
                  <span className="text-foreground">how to perform a recurring type of work</span>.
                  For example, a{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                    reviewing-code
                  </code>{' '}
                  skill teaches an agent how to perform a structured code review.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Subagent</h3>
                <p className="leading-7 text-muted-foreground">
                  A subagent is a{' '}
                  <span className="text-foreground">specialized worker or role</span> that can be
                  delegated a task. For example, a{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">reviewer</code>{' '}
                  is a specialized agent whose job is to review code.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Project instructions</h3>
                <p className="leading-7 text-muted-foreground">
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                    AGENTS.md
                  </code>{' '}
                  contains project-wide rules and context that apply to every agent working in the
                  repository.
                </p>
              </div>
            </div>

            <CodeBlock
              label="The four layers"
              value={`AGENTS.md
    ↓
Project-wide rules

Skill
    ↓
How a recurring task should be performed

Subagent
    ↓
Who performs a delegated task

User prompt
    ↓
What should be done right now`}
            />

            <p className="leading-7 text-muted-foreground">
              Each layer answers a different question. None of them replaces the others: rules
              constrain the work, Skills describe how the work is done, subagents decide who does
              it, and your prompt states what should happen right now.
            </p>
          </DocSection>

          <DocSection id="install" title="1. Install the setup skill">
            <p className="leading-7 text-muted-foreground">
              This tutorial is built around{' '}
              <Link href={`/skills/${setupSkillSlug}`} className={linkStyle}>
                Setting Up Agentic Projects
              </Link>{' '}
              from the{' '}
              <a href={repositoryUrl} className={linkStyle}>
                GiovanniL30/ai-skills repository
              </a>
              . That skill prepares an existing or new repository for agentic development and can
              configure tool-native subagent roles when the target coding tool is known and
              supported.
            </p>

            <CodeBlock
              label="Install the setup skill (project scope)"
              value={buildInstallCommand(setupSkillSlug)}
            />

            <ul className={listStyle}>
              <li>
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  npx skills add
                </code>{' '}
                installs an Agent Skill from a repository.
              </li>
              <li>
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  GiovanniL30/ai-skills
                </code>{' '}
                is the Skill repository.
              </li>
              <li>
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  --skill setting-up-agentic-projects
                </code>{' '}
                selects only the setup skill.
              </li>
              <li>The exact installation location depends on your agent or coding tool.</li>
            </ul>

            <p className="leading-7 text-muted-foreground">
              Do not assume that every AI coding tool discovers skills in exactly the same
              directory. Check your tool&apos;s own skill discovery documentation if you need the
              precise path.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Project installation</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  Installs the skill into the repository you are working in. This is the default.
                </p>
                <CodeBlock
                  label="Project scope"
                  value={buildInstallCommand(setupSkillSlug, 'interactive', 'project')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Global installation</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  Makes the skill available in your user environment across projects.
                </p>
                <CodeBlock
                  label="Global scope"
                  value={buildInstallCommand(setupSkillSlug, 'interactive', 'global')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Explicit skill invocation</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  Invocation syntax depends on the coding tool. Where{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                    $skill-name
                  </code>{' '}
                  invocation is supported, you can ask for it directly:
                </p>
                <CodeBlock
                  label="Explicit invocation (where $skill-name is supported)"
                  value={`Use $setting-up-agentic-projects to configure this project for agentic development.`}
                />
                <p className="text-sm leading-7 text-muted-foreground">
                  Otherwise, use the portable wording that works anywhere:
                </p>
                <CodeBlock
                  label="Explicit invocation (portable wording)"
                  value={`Use the setting-up-agentic-projects skill to configure this project for agentic development.`}
                />
              </div>
            </div>

            <p className="leading-7 text-muted-foreground">
              <span className="font-medium text-foreground">Important: </span>
              installing a Skill only installs instructions. It does not create a subagent, and it
              does not change your project. Nothing is configured until you ask the skill to do so,
              which is what Part 3 covers.
            </p>
          </DocSection>

          <DocSection id="project" title="2. Start with a normal project">
            <p className="leading-7 text-muted-foreground">
              Use an ordinary project. Nothing agent-specific is required yet:
            </p>
            <CodeBlock
              label="Example project"
              value={`my-project/
├── src/
├── tests/
├── package.json
└── README.md`}
            />
            <p className="leading-7 text-muted-foreground">
              You do <span className="text-foreground">not</span> need to manually create agent
              configuration files first. The purpose of{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                setting-up-agentic-projects
              </code>{' '}
              is to inspect the existing project and determine what setup is actually appropriate.
            </p>
          </DocSection>

          <DocSection
            id="setup-prompt"
            title="3. Ask the setup skill to create a reviewer subagent"
          >
            <p className="leading-7 text-muted-foreground">
              Copy this prompt into your coding agent from the project root:
            </p>
            <CodeBlock
              label="Prompt: create the reviewer subagent (setup)"
              value={mainSetupPrompt}
            />
            <p className="leading-7 text-muted-foreground">
              This is intentionally a{' '}
              <span className="font-medium text-foreground">setup request</span>, not a code-review
              request. The setup skill&apos;s job is to prepare the project and configure the role -
              it does not perform a review yet. Part 6 covers the separate task prompt that actually
              runs the reviewer.
            </p>
            <p className="text-sm leading-7 text-muted-foreground">
              Note:{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                reviewing-code
              </code>{' '}
              is used throughout this tutorial as an illustrative example of a review-workflow skill
              name. Substitute the review workflow your own project uses.
            </p>
          </DocSection>

          <DocSection id="workflow" title="4. What the setup skill does">
            <CodeBlock
              label="Setup workflow"
              value={`User
 │
 │ "Create a reviewer subagent"
 ▼
setting-up-agentic-projects
 │
 ├── Discover repository
 │
 ├── Inspect AGENTS.md
 │
 ├── Inspect existing Skills
 │
 ├── Identify coding tool
 │
 ├── Verify supported subagent configuration
 │
 ├── Create minimal configuration
 │
 └── Verify setup
        │
        ▼
   Reviewer Subagent
        │
        ▼
   reviewing-code Skill`}
            />
            <p className="leading-7 text-muted-foreground">
              The setup skill does not blindly generate a generic agent file. It determines the
              appropriate configuration based on the actual coding tool in use, verifies that the
              tool supports custom subagents, and checks the current official documentation before
              writing anything. If the tool has no supported mechanism, it should tell you instead
              of inventing a configuration path.
            </p>
          </DocSection>

          <DocSection id="together" title="5. Skill and subagent working together">
            <CodeBlock
              label="How the pieces connect"
              value={`Reviewer Subagent
       │
       ▼
reviewing-code Skill
       │
       ▼
Repository
       │
       ▼
Review Findings`}
            />
            <div className="flex flex-col gap-4">
              <blockquote className="border-l-2 border-border pl-4 leading-7 text-muted-foreground">
                <span className="font-medium text-foreground">Subagent = role. </span>
                &ldquo;You are the code reviewer.&rdquo;
              </blockquote>
              <blockquote className="border-l-2 border-border pl-4 leading-7 text-muted-foreground">
                <span className="font-medium text-foreground">
                  Skill = expertise and workflow.{' '}
                </span>
                &ldquo;Here is the structured process for performing a good code review.&rdquo;
              </blockquote>
            </div>
            <p className="leading-7 text-muted-foreground">
              This distinction is the key lesson of the tutorial. The subagent decides{' '}
              <span className="text-foreground">who</span> performs the work and what it is allowed
              to do; the Skill decides <span className="text-foreground">how</span> that type of
              work is performed. Because they are separate, many roles can share the same Skill.
            </p>
          </DocSection>

          <DocSection id="run" title="6. Run the subagent">
            <p className="leading-7 text-muted-foreground">
              Once the setup is complete, use a second prompt that actually uses the configured
              reviewer:
            </p>
            <CodeBlock label="Prompt: run the reviewer (task)" value={reviewerTaskPrompt} />
            <p className="leading-7 text-muted-foreground">
              This is now a <span className="font-medium text-foreground">task prompt</span>, while
              the prompt in Part 3 was a{' '}
              <span className="font-medium text-foreground">setup prompt</span>. The setup prompt
              configures the project once; the task prompt can be reused every time you want a
              review.
            </p>
          </DocSection>

          <DocSection id="architecture" title="7. The resulting architecture">
            <CodeBlock
              label="Conceptual architecture"
              value={`                    PROJECT
                       │
                       ▼
                  AGENTS.md
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
 Reviewer Subagent            Other Agents
          │
          ▼
  reviewing-code Skill
          │
          ▼
       Repository`}
            />
            <p className="leading-7 text-muted-foreground">
              Multiple specialized subagents can reuse the same Skills:
            </p>
            <CodeBlock
              label="One Skill, many roles"
              value={`Reviewer Agent
      └── reviewing-code

Debugger Agent
      └── debugging-code

Frontend Agent
      └── designing-frontend

Implementation Agent
      └── implementing-features`}
            />
            <p className="leading-7 text-muted-foreground">
              This is exactly why Skills and subagents are separate concepts: roles come and go, but
              the workflows they depend on stay shared and consistent.
            </p>
          </DocSection>

          <DocSection id="other-roles" title="8. Use the setup skill for other roles">
            <p className="leading-7 text-muted-foreground">
              The same pattern works for any specialized role. For example, a frontend designer:
            </p>
            <CodeBlock
              label="Prompt: create the frontend-design subagent"
              value={frontendSetupPrompt}
            />
            <CodeBlock
              label="Frontend designer using the frontend Skill"
              value={`Frontend Designer Subagent
          │
          ▼
 designing-frontend
          │
          ▼
Frontend project`}
            />
            <p className="leading-7 text-muted-foreground">
              See the{' '}
              <Link href="/skills/designing-frontend" className={linkStyle}>
                Designing Frontend skill
              </Link>{' '}
              for the workflow this role would follow.
            </p>
          </DocSection>

          <DocSection id="tool-config" title="9. Tool-specific configuration">
            <p className="leading-7 text-muted-foreground">
              This section is important. Agent Skills are designed to be portable, while custom
              subagent configuration is often tool-specific:
            </p>
            <blockquote className="border-l-2 border-border pl-4 leading-7 text-muted-foreground">
              The Skill can be portable across compatible coding agents, but subagent configuration
              may be different for each tool.{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                setting-up-agentic-projects
              </code>{' '}
              checks the target tool and its current documentation before generating native
              configuration.
            </blockquote>
            <p className="leading-7 text-muted-foreground">
              Conceptually, the same request results in different native output:
            </p>
            <CodeBlock
              label="Conceptual examples only"
              value={`Codex
  → native Codex subagent configuration

Claude Code
  → native Claude Code subagent configuration

OpenCode
  → native OpenCode agent configuration

Other tools
  → verify their current agent configuration support`}
            />
            <ul className={listStyle}>
              <li>
                Do <span className="text-foreground">not</span> treat any single directory (for
                example{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  .agents/agents/
                </code>
                ) as a universal subagent location.
              </li>
              <li>Not every tool supports custom subagents; verify before configuring.</li>
              <li>
                The tutorial deliberately hardcodes no tool-specific configuration syntax - the
                setup skill reads the current official documentation instead.
              </li>
              <li>
                Native discovery must be verified for your target tool; a directory alone does not
                activate an agent.
              </li>
            </ul>
          </DocSection>

          <DocSection id="no-duplication" title="10. Do not manually duplicate Skills">
            <p className="leading-7 text-muted-foreground">
              A common anti-pattern is copying the whole workflow into the agent definition:
            </p>
            <CodeBlock
              label="Bad approach: duplicating the workflow"
              value={`reviewer-agent.md

"You are a reviewer.
Check security.
Check performance.
Check maintainability.
Check correctness.
..."`}
            />
            <p className="leading-7 text-muted-foreground">
              This duplicates the workflow already provided by{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                reviewing-code/SKILL.md
              </code>
              , and the two copies will drift apart. Prefer:
            </p>
            <CodeBlock
              label="Preferred: reference the Skill"
              value={`Reviewer Subagent
      │
      └── uses reviewing-code`}
            />
            <p className="leading-7 text-muted-foreground">
              The subagent defines the <span className="text-foreground">role and boundaries</span>.
              The Skill defines the <span className="text-foreground">reusable workflow</span>.
            </p>
          </DocSection>

          <DocSection id="when" title="11. When you actually need a subagent">
            <CodeBlock
              label="Decision guide"
              value={`Do I need a specialized worker?
          │
          ├── No
          │    ↓
          │  Use a prompt + Skill
          │
          └── Yes
               ↓
       Create/configure a subagent
               │
               ↓
          Give it a Skill`}
            />
            <p className="leading-7 text-muted-foreground">
              Not every task needs a subagent. A subagent is useful when:
            </p>
            <ul className={listStyle}>
              <li>the task benefits from independent context</li>
              <li>the role needs different permissions</li>
              <li>the task can be performed in parallel</li>
              <li>the coding tool provides a useful native agent mechanism</li>
              <li>the role is repeated often</li>
            </ul>
            <p className="leading-7 text-muted-foreground">
              Otherwise, using a Skill directly from the main agent with a normal prompt may be
              simpler.
            </p>
          </DocSection>

          <DocSection id="mistakes" title="12. Common mistakes">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h3 className="font-medium">
                  Mistake 1: Treating Skills and subagents as the same thing
                </h3>
                <CodeBlock label="Incorrect" value={`Skill = Subagent`} />
                <CodeBlock
                  label="Correct"
                  value={`Skill = reusable expertise/workflow
Subagent = specialized worker/role`}
                />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-medium">
                  Mistake 2: Creating an agent file manually without checking the tool
                </h3>
                <p className="leading-7 text-muted-foreground">
                  Different coding tools use different configuration formats. Use{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                    setting-up-agentic-projects
                  </code>{' '}
                  to determine the supported approach instead of guessing.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-medium">
                  Mistake 3: Putting the entire Skill into the subagent
                </h3>
                <p className="leading-7 text-muted-foreground">
                  Avoid duplicating the Skill&apos;s contents in the agent definition. Reference or
                  use the Skill instead.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-medium">Mistake 4: Giving a reviewer write access</h3>
                <p className="leading-7 text-muted-foreground">
                  A reviewer should normally be read-only unless there is a specific reason
                  otherwise.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-medium">Mistake 5: Creating a subagent for every task</h3>
                <p className="leading-7 text-muted-foreground">
                  Use a normal prompt plus a Skill when a separate agent provides no meaningful
                  advantage.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-medium">
                  Mistake 6: Assuming a directory automatically activates an agent
                </h3>
                <p className="leading-7 text-muted-foreground">
                  A directory such as{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                    .agents/agents/
                  </code>{' '}
                  is not universally supported. Native discovery must be verified for the target
                  tool.
                </p>
              </div>
            </div>
          </DocSection>

          <DocSection id="pattern" title="13. Quick reusable pattern">
            <ol className={orderedListStyle}>
              <li>Install the Skill.</li>
              <li>Ask setting-up-agentic-projects to inspect the project.</li>
              <li>Specify the role you want.</li>
              <li>Specify which Skill the role should use.</li>
              <li>Specify permissions and boundaries.</li>
              <li>Let the setup Skill determine the tool-native configuration.</li>
              <li>Verify the configuration.</li>
              <li>Run the subagent with a task-specific prompt.</li>
            </ol>
            <CodeBlock label="Reusable prompt template" value={promptTemplate} />
            <p className="leading-7 text-muted-foreground">
              Save the template, fill in the brackets, and you have a setup prompt for any role. See
              the{' '}
              <Link href={`/skills/${setupSkillSlug}`} className={linkStyle}>
                Setting Up Agentic Projects guide
              </Link>{' '}
              for the full workflow, and the{' '}
              <Link href="/use-cases" className={linkStyle}>
                use cases page
              </Link>{' '}
              for ready-made task prompts.
            </p>
          </DocSection>

          <DocSection id="mental-model" title="14. Final mental model">
            <CodeBlock
              label="Four questions"
              value={`AGENTS.md
"What rules does this project follow?"

Skill
"How should this type of work be performed?"

Subagent
"Who should perform this specialized work?"

Prompt
"What do I want done right now?"`}
            />
            <CodeBlock
              label="The full chain"
              value={`                User
                  │
                  ▼
               Prompt
                  │
                  ▼
             Subagent
                  │
                  ▼
                Skill
                  │
                  ▼
              Project`}
            />
            <p className="leading-7 text-muted-foreground">
              <span className="font-medium text-foreground">Takeaway: </span>
              Use{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                setting-up-agentic-projects
              </code>{' '}
              when you want help preparing the project and configuring specialized agent roles. Use
              your task-specific Skills to give those roles reusable expertise.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={`/skills/${setupSkillSlug}`} className={linkStyle}>
                Read the setup skill guide →
              </Link>
              <Link href="/installation" className={linkStyle}>
                Installation options →
              </Link>
              <Link href="/tutorials" className={linkStyle}>
                All tutorials →
              </Link>
            </div>
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
