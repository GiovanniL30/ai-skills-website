'use client';

import { useState } from 'react';

import { CopyButton } from '@/components/copy-button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { agents, buildInstallCommand, type AgentId, type InstallScope } from '@/lib/installation';
import type { SkillSlug } from '@/lib/skills';

interface CommandBuilderProps {
  options: { slug: SkillSlug; title: string }[];
}

const selectClasses =
  'min-h-12 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm';

export function CommandBuilder({ options }: CommandBuilderProps) {
  const [skill, setSkill] = useState<SkillSlug>('understanding-codebases');
  const [agent, setAgent] = useState<AgentId>('interactive');
  const [scope, setScope] = useState<InstallScope>('project');
  const command = buildInstallCommand(skill, agent, scope);
  return (
    <div className="flex min-w-0 flex-col gap-7 rounded-xl border border-border p-5 sm:p-6">
      <FieldGroup className="grid gap-5 md:grid-cols-3">
        <Field>
          <FieldLabel htmlFor="install-skill">Skill</FieldLabel>
          <select
            id="install-skill"
            value={skill}
            onChange={(event) => {
              const selected = options.find((option) => option.slug === event.target.value);
              if (selected) setSkill(selected.slug);
            }}
            className={selectClasses}
          >
            {options.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.title}
              </option>
            ))}
          </select>
        </Field>
        <Field>
          <FieldLabel htmlFor="install-agent">Agent</FieldLabel>
          <select
            id="install-agent"
            value={agent}
            aria-describedby="agent-description"
            onChange={(event) => {
              const selected = agents.find((option) => option.id === event.target.value);
              if (selected) setAgent(selected.id);
            }}
            className={selectClasses}
          >
            {agents.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldDescription id="agent-description">
            Interactive lets you select your agent in the terminal.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="install-scope">Scope</FieldLabel>
          <select
            id="install-scope"
            value={scope}
            aria-describedby="scope-description"
            onChange={(event) => setScope(event.target.value === 'global' ? 'global' : 'project')}
            className={selectClasses}
          >
            <option value="project">Project</option>
            <option value="global">Global</option>
          </select>
          <FieldDescription id="scope-description">
            Project is the default. Global installs to your user environment.
          </FieldDescription>
        </Field>
      </FieldGroup>
      <div className="flex min-w-0 flex-col gap-4">
        <p className="text-sm font-medium">Your installation command</p>
        <pre
          data-install-command
          className="rounded-lg bg-muted p-4 font-mono text-sm leading-7 whitespace-pre-wrap [overflow-wrap:anywhere]"
        >
          <code>{command}</code>
        </pre>
        <CopyButton
          value={command}
          label="Copy command"
          accessibleLabel="Copy generated installation command"
          variant="default"
        />
        <p className="text-sm leading-6 text-muted-foreground">
          {agent === 'interactive'
            ? 'The installer will prompt you to choose an agent and installation method.'
            : 'An explicit agent adds --agent and --copy, using full file copies rather than symlinks.'}{' '}
          Commands are copied as text; this website never executes them.
        </p>
      </div>
    </div>
  );
}
