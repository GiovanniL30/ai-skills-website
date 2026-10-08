export interface Tutorial {
  slug: string;
  title: string;
  summary: string;
  path: string;
}

export const tutorials: Tutorial[] = [
  {
    slug: 'create-a-subagent-with-a-skill',
    title: 'How to Create a Subagent with an Agent Skill',
    summary:
      'A beginner-friendly walkthrough of the four core concepts - AGENTS.md, Skills, subagents, and prompts - using the setting-up-agentic-projects skill to configure a specialized reviewer subagent, run it, and reuse the pattern for other roles.',
    path: '/tutorials/create-a-subagent-with-a-skill',
  },
];

export function getTutorial(slug: string): Tutorial | undefined {
  return tutorials.find((tutorial) => tutorial.slug === slug);
}
