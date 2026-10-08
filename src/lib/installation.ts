import { installationSource, type SkillSlug } from '@/lib/skills';

export const agents = [
  { id: 'interactive', label: 'Interactive' },
  { id: 'codex', label: 'Codex' },
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'opencode', label: 'OpenCode' },
] as const;

export type AgentId = (typeof agents)[number]['id'];
export type InstallScope = 'project' | 'global';

export const buildInstallCommand = (
  skill: SkillSlug,
  agent: AgentId = 'interactive',
  scope: InstallScope = 'project'
) => {
  const command = ['npx skills add', installationSource, '--skill', skill];
  if (agent !== 'interactive') command.push('--agent', agent, '--copy');
  if (scope === 'global') command.push('--global');
  return command.join(' ');
};

export const listSkillsCommand = `npx skills add ${installationSource} --list`;
export const cliDocumentationUrl = 'https://github.com/vercel-labs/skills#options';
