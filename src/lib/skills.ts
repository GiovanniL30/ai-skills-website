export const repositoryUrl = 'https://github.com/GiovanniL30/ai-skills';
export const installationSource = `${repositoryUrl}/tree/main/skills`;
export const sourceRevision = '0a5128bddd1e7d8f179c45ea99f6ebf704f5072e';

export const skillSlugs = [
  'understanding-codebases',
  'implementing-features',
  'debugging-code',
  'designing-frontend',
  'setting-up-agentic-projects',
] as const;

export type SkillSlug = (typeof skillSlugs)[number];
export const categories = ['Codebase', 'Development', 'Frontend', 'Agent setup'] as const;
export type Category = (typeof categories)[number];

export interface UseCase {
  title: string;
  situation: string;
  prompt: string;
  expectedOutput: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface Skill {
  slug: SkillSlug;
  title: string;
  packageName: SkillSlug;
  summary: string;
  category: Category;
  whenToUse: string[];
  workflow: WorkflowStep[];
  requirements: string[];
  expectedOutputs: string[];
  useCases: [UseCase, UseCase, UseCase, ...UseCase[]];
  helpers: { title: string; description: string; path: string }[];
  references: { title: string; path: string }[];
  relatedSkills: SkillSlug[];
  sourceUrl: string;
}

const filesystemRequirement =
  'A coding agent with Agent Skills support and permission to read the target repository.';

export const skills: Skill[] = [
  {
    slug: 'understanding-codebases',
    title: 'Understanding Codebases',
    packageName: 'understanding-codebases',
    category: 'Codebase',
    summary:
      'Build an evidence-based map of an unfamiliar repository. Find entry points, trace data flow, and identify the right change surface before editing.',
    whenToUse: [
      'You are joining an unfamiliar repository or subsystem.',
      'You need to understand how a feature works across modules.',
      'You want to locate the files and tests relevant to a future change.',
    ],
    workflow: [
      {
        title: 'Establish the repository shape',
        description:
          'Inspect the stack, important directories, build configuration, and project instructions. Start broad, then narrow the investigation.',
      },
      {
        title: 'Confirm entry points and boundaries',
        description:
          'Follow actual imports, calls, and runtime wiring rather than inferring responsibilities from folder names.',
      },
      {
        title: 'Trace the requested behavior',
        description:
          'Follow control and data from the visible entry point through services, persistence, and integrations. Record relevant files and symbols.',
      },
      {
        title: 'Inspect adjacent implementations and tests',
        description:
          'Search related domain terms and interfaces. Use tests and configuration as evidence about intended behavior.',
      },
      {
        title: 'Produce a working map',
        description:
          'Explain the stack, structure, execution flow, conventions, and likely change surface. Separate observations, inferences, and unknowns.',
      },
    ],
    requirements: [
      filesystemRequirement,
      'Repository search and shell access are recommended. Investigation stays read-only unless implementation is explicitly requested afterward.',
    ],
    expectedOutputs: [
      'A concise codebase map with important files, symbols, and their responsibilities.',
      'An execution and data-flow explanation supported by repository evidence.',
      'Relevant tests, conventions, likely change locations, and unresolved questions.',
    ],
    useCases: [
      {
        title: 'Understanding an unfamiliar repository',
        situation:
          'You have inherited a repository and need to understand how requests reach storage before making changes.',
        prompt:
          'Use understanding-codebases. Trace one main request from its entry point through business logic to persistence. Cite the relevant files and symbols, identify tests and conventions, and separate facts from assumptions. Do not edit code.',
        expectedOutput:
          'A focused repository map, request flow, key files, and a list of unresolved questions.',
      },
      {
        title: 'Locate a feature before changing it',
        situation:
          'A requested behavior spans several modules and its implementation is not obvious.',
        prompt:
          'Use understanding-codebases. Find how this project implements authentication, including entry points, runtime wiring, state, and tests. Identify the likely change surface for adding a new sign-in method. Do not implement it yet.',
        expectedOutput:
          'An evidence-based authentication flow and the smallest likely set of files to change.',
      },
      {
        title: 'Trace an event across services',
        situation: 'An event is produced in one module and handled elsewhere.',
        prompt:
          'Use understanding-codebases. Trace the event discussed in this task from producer to definition, dispatcher, consumers, and downstream actions. Check actual wiring and tests. Report what is observed and what remains unknown without editing files.',
        expectedOutput:
          'A producer-to-consumer flow with source references, dependencies, and uncertainties.',
      },
    ],
    helpers: [
      {
        title: 'Repository inspector',
        description:
          'Optional inspect-project.mjs inventories root-level project indicators. It needs Node.js 18+ and accepts --root for the target repository; it does not establish semantic architecture or complete workspace coverage.',
        path: 'scripts/inspect-project.mjs',
      },
    ],
    references: [
      { title: 'Architecture analysis', path: 'references/architecture-analysis.md' },
      { title: 'Investigation patterns', path: 'references/investigation-patterns.md' },
    ],
    relatedSkills: ['implementing-features', 'debugging-code', 'setting-up-agentic-projects'],
    sourceUrl: `${repositoryUrl}/blob/main/skills/understanding-codebases/SKILL.md`,
  },
  {
    slug: 'implementing-features',
    title: 'Implementing Features',
    packageName: 'implementing-features',
    category: 'Development',
    summary:
      'Implement requested behavior with the smallest maintainable change. Reuse existing architecture, keep contracts synchronized, and verify the result.',
    whenToUse: [
      'You are implementing a feature, ticket, or behavior change in an existing repository.',
      'You need to extend an API, interface, or workflow while preserving compatibility.',
      'A change crosses several layers and their contracts must stay aligned.',
    ],
    workflow: [
      {
        title: 'Define observable behavior',
        description:
          'Identify inputs, outputs, success and failure cases, acceptance criteria, and behavior that must remain unchanged.',
      },
      {
        title: 'Find existing patterns',
        description:
          'Trace the affected path and search for analogous implementations, tests, and shared interfaces before creating abstractions.',
      },
      {
        title: 'Plan the smallest coherent change',
        description:
          'Identify the affected files, contract changes, compatibility needs, and appropriate verification.',
      },
      {
        title: 'Implement and synchronize contracts',
        description:
          'Follow repository conventions and update the participating producers and consumers of changed types, APIs, events, or configuration.',
      },
      {
        title: 'Verify and review',
        description:
          'Exercise the requested behavior, then relevant lint, type, and build checks. Review the diff and report actual results and gaps.',
      },
    ],
    requirements: [
      filesystemRequirement,
      'Permission to edit the requested change surface. Repository search and shell access are recommended.',
      'The target project’s own tooling is needed to run its checks. Follow existing test infrastructure.',
    ],
    expectedOutputs: [
      'The requested behavior implemented within the existing architecture.',
      'Synchronized interfaces and focused tests where practical.',
      'A reviewed diff and a report of checks actually run, assumptions, and unverified areas.',
    ],
    useCases: [
      {
        title: 'Implementing a feature',
        situation:
          'A catalog needs search and category filtering without changing its existing layout or data contracts.',
        prompt:
          'Use implementing-features. Add search by name and description plus category filtering to this catalog. Reuse existing components and data types, handle empty results, preserve unrelated behavior, and verify the requested interactions. Report the checks actually run.',
        expectedOutput:
          'Working filtering behavior, appropriate coverage, and a focused implementation report.',
      },
      {
        title: 'Extend an API contract',
        situation: 'A new response field must be consumed by an existing client.',
        prompt:
          'Use implementing-features. Add the requested optional response field to this endpoint and update its client and shared types. Search all usages, preserve existing callers, cover the new behavior, and report compatibility decisions and verification.',
        expectedOutput:
          'A compatible API extension with synchronized types, consumers, and relevant tests.',
      },
      {
        title: 'Add a validation rule',
        situation:
          'A form needs a new business rule with consistent behavior across UI and backend.',
        prompt:
          'Use implementing-features. Implement the validation rule described in this task at the existing authoritative boundary and update the form’s feedback. Preserve current error conventions, test valid and invalid inputs, and review the final diff.',
        expectedOutput:
          'Consistent validation and user feedback with targeted success and failure checks.',
      },
    ],
    helpers: [
      {
        title: 'Verification command detector',
        description:
          'Optional verify-project.mjs needs Node.js 18+. It accepts --root and reports detected checks by default. --run deliberately executes project-defined commands; inspect those commands first and select workspace packages explicitly.',
        path: 'scripts/verify-project.mjs',
      },
    ],
    references: [
      { title: 'Change strategy', path: 'references/change-strategy.md' },
      { title: 'Implementation quality', path: 'references/implementation-quality.md' },
      { title: 'Verification strategy', path: 'references/verification.md' },
    ],
    relatedSkills: ['understanding-codebases', 'debugging-code', 'designing-frontend'],
    sourceUrl: `${repositoryUrl}/blob/main/skills/implementing-features/SKILL.md`,
  },
  {
    slug: 'debugging-code',
    title: 'Debugging Code',
    packageName: 'debugging-code',
    category: 'Development',
    summary:
      'Reproduce a defect, test focused hypotheses, and fix its root cause. Verify the original failure and add regression coverage where practical.',
    whenToUse: [
      'A test fails, an exception occurs, or behavior differs from expectations.',
      'You are investigating a regression, integration failure, or performance anomaly.',
      'The cause is unclear, intermittent, or specific to an environment.',
    ],
    workflow: [
      {
        title: 'Define and reproduce the failure',
        description:
          'Record expected and actual behavior, relevant input, and the narrowest repeatable test, request, command, or interaction.',
      },
      {
        title: 'Collect relevant evidence',
        description:
          'Inspect the failing path, logs, assertions, runtime wiring, and configuration. Keep observations separate from hypotheses.',
      },
      {
        title: 'Test focused hypotheses',
        description:
          'Change one meaningful variable at a time and choose small tests that distinguish plausible causes.',
      },
      {
        title: 'Fix the responsible boundary',
        description:
          'Explain the cause-to-failure chain and make the smallest correction that preserves contracts and unrelated behavior.',
      },
      {
        title: 'Verify the original failure',
        description:
          'Add regression coverage when practical, rerun the reproduction and nearby checks, and remove temporary diagnostics.',
      },
    ],
    requirements: [
      filesystemRequirement,
      'Shell access is recommended for reproductions, tests, and repository inspection.',
      'Provide the failing test, error, logs, or reproduction steps when available. If reproduction cannot be established, the report must say so.',
    ],
    expectedOutputs: [
      'A precise failure description and root-cause explanation supported by evidence.',
      'A scoped fix and an automated regression test when practical.',
      'Results for the original reproduction and relevant checks, including any remaining uncertainty.',
    ],
    useCases: [
      {
        title: 'Investigating a failing test',
        situation: 'A test that previously passed now fails, and the cause is not established.',
        prompt:
          'Use debugging-code. Investigate the failing test provided in this task. Reproduce it before editing, trace the failing execution path, and test focused hypotheses. Fix the root cause without weakening assertions, add regression coverage if needed, and rerun the original failure.',
        expectedOutput:
          'Reproduction evidence, a justified root cause, a minimal fix, and verification results.',
      },
      {
        title: 'Diagnose an API exception',
        situation: 'An endpoint crashes for a specific input or stored-data condition.',
        prompt:
          'Use debugging-code. Reproduce the reported API exception with the smallest input. Trace the request and data to the responsible boundary, distinguish the crash location from the root cause, and verify a minimal fix with a regression test.',
        expectedOutput:
          'An input-to-failure explanation and a verified correction that preserves the endpoint contract.',
      },
      {
        title: 'Investigate an intermittent regression',
        situation: 'A failure appears only under a particular timing or environment.',
        prompt:
          'Use debugging-code. Compare the working and failing environments for the intermittent behavior described here. Control relevant inputs, state, and timing; record hypotheses and distinguishing tests. Report reproduction limits and avoid speculative retries or timeout changes.',
        expectedOutput:
          'Controlled evidence, tested hypotheses, and an honest account of what can and cannot be reproduced.',
      },
    ],
    helpers: [
      {
        title: 'Debug context collector',
        description:
          'Optional collect-debug-context.mjs needs Node.js 18+ and accepts --root. It gathers objective project and repository context; failed or unavailable runtime probes return null. It does not diagnose the root cause.',
        path: 'scripts/collect-debug-context.mjs',
      },
    ],
    references: [
      { title: 'Reproduction and evidence', path: 'references/reproduction-and-evidence.md' },
      { title: 'Debugging strategy', path: 'references/debugging-strategy.md' },
      { title: 'Fix quality', path: 'references/fix-quality.md' },
    ],
    relatedSkills: ['understanding-codebases', 'implementing-features'],
    sourceUrl: `${repositoryUrl}/blob/main/skills/debugging-code/SKILL.md`,
  },
  {
    slug: 'designing-frontend',
    title: 'Designing Frontend',
    packageName: 'designing-frontend',
    category: 'Frontend',
    summary:
      'Build or improve interfaces within the product’s visual language. Reuse components, design interaction states, and check responsiveness and accessibility.',
    whenToUse: [
      'You are creating or revising a page, component, form, or navigation.',
      'An interface needs clearer hierarchy, responsive behavior, or accessible controls.',
      'You need to handle loading, empty, error, and success states consistently.',
    ],
    workflow: [
      {
        title: 'Understand the product and existing UI',
        description:
          'Identify the user goal, content priorities, devices, and constraints. Inspect components, tokens, typography, and interaction conventions.',
      },
      {
        title: 'Define a focused UI intent',
        description:
          'Choose page regions, hierarchy, density, primary interactions, and responsive behavior before editing.',
      },
      {
        title: 'Reuse and implement',
        description:
          'Compose suitable existing primitives and semantic tokens. Keep changes within the requested interface.',
      },
      {
        title: 'Design the important states',
        description:
          'Handle focus, loading, empty, errors, success, and disabled behavior. Keep feedback close to the affected control.',
      },
      {
        title: 'Inspect the real result',
        description:
          'Verify layout at relevant widths, keyboard navigation, semantics, and visual hierarchy. Run project checks and disclose any unavailable preview.',
      },
    ],
    requirements: [
      filesystemRequirement,
      'Access to the target product’s existing UI, components, tokens, and design constraints.',
      'Browser or preview access is strongly recommended for visual verification. Code checks alone do not establish UI quality.',
    ],
    expectedOutputs: [
      'An implemented interface that fits the existing visual language and supports the requested task.',
      'Relevant interaction states, responsive layouts, and accessible controls.',
      'A report of reused components, visual and keyboard checks, project checks, and unverified areas.',
    ],
    useCases: [
      {
        title: 'Improving an interface',
        situation:
          'An existing form has unclear hierarchy and inconsistent feedback on narrow screens.',
        prompt:
          'Use designing-frontend. Improve this form using the existing components and tokens. Clarify field grouping and action hierarchy, preserve behavior, and handle validation, loading, and success states. Inspect mobile and desktop rendering and verify keyboard access.',
        expectedOutput:
          'A coherent responsive form with accessible controls and verified interaction states.',
      },
      {
        title: 'Make navigation work on mobile',
        situation: 'Desktop navigation needs an accessible compact layout.',
        prompt:
          'Use designing-frontend. Adapt the existing navigation for mobile while preserving current-location cues and important links. Reuse the project’s dialog or drawer primitives. Verify focus containment, Escape, focus return, and responsive rendering.',
        expectedOutput: 'Usable mobile navigation with predictable keyboard and focus behavior.',
      },
      {
        title: 'Design useful empty and error states',
        situation: 'A data view has only been designed for successful populated results.',
        prompt:
          'Use designing-frontend. Add empty, loading, and error states to this data view using existing primitives. Explain each state and provide a useful recovery action. Preserve entered values and verify the rendered states at narrow and desktop widths.',
        expectedOutput:
          'Consistent states that communicate what happened and how the user can continue.',
      },
    ],
    helpers: [
      {
        title: 'Frontend inventory inspector',
        description:
          'Optional inspect-frontend.mjs needs Node.js 18+ and accepts --root. It reports frontend indicators for one package at a time; it cannot judge visual quality and does not replace browser checks.',
        path: 'scripts/inspect-frontend.mjs',
      },
    ],
    references: [
      { title: 'Visual design', path: 'references/visual-design.md' },
      { title: 'Interaction states', path: 'references/interaction-states.md' },
      {
        title: 'Responsive design and accessibility',
        path: 'references/responsive-accessibility.md',
      },
      { title: 'Frontend review checklist', path: 'assets/frontend-review-checklist.md' },
    ],
    relatedSkills: ['understanding-codebases', 'implementing-features'],
    sourceUrl: `${repositoryUrl}/blob/main/skills/designing-frontend/SKILL.md`,
  },
  {
    slug: 'setting-up-agentic-projects',
    title: 'Setting Up Agentic Projects',
    packageName: 'setting-up-agentic-projects',
    category: 'Agent setup',
    summary:
      'Prepare, audit, or migrate a repository for AI-assisted development. Create minimal project instructions and essential tool adapters while preserving existing configuration.',
    whenToUse: [
      'You need to prepare a new or existing repository for a coding agent.',
      'Project instructions and tool configuration are duplicated, stale, or inconsistent.',
      'You are adding another coding tool or refreshing instructions after an approved design change.',
    ],
    workflow: [
      {
        title: 'Choose the operating mode',
        description:
          'Use setup, read-only audit, migration, or refresh according to the task. Setup does not implement application features.',
      },
      {
        title: 'Discover project evidence',
        description:
          'Inspect the actual stack, documentation, approved requirements, commands, instructions, and installed skills. Report contradictions and incomplete coverage.',
      },
      {
        title: 'Create the minimal shared contract',
        description:
          'Keep project policy separate from reusable skills and delegated roles. Write concise instructions that link to real authoritative documents.',
      },
      {
        title: 'Add only necessary adapters',
        description:
          'Preserve existing files and verify current official tool configuration and discovery formats before creating native adapters.',
      },
      {
        title: 'Validate and report',
        description:
          'Check paths, commands, consistency, scope, and supported syntax. Verify native discovery if a runtime is available; otherwise mark it as untested.',
      },
    ],
    requirements: [
      filesystemRequirement,
      'Access to existing project instructions and any approved requirements, architecture, API, database, or UI documents.',
      'For tool-specific adapters, identify the selected coding tool and check current official documentation. Native runtime checks require that tool to be available.',
      'Audit mode is read-only. Setup changes instructions and essential configuration, not application logic.',
    ],
    expectedOutputs: [
      'Minimal shared project instructions referencing existing source-of-truth documents.',
      'Only the required tool adapters or prioritized read-only audit findings, depending on mode.',
      'A setup report distinguishing discovered facts, changes, verified paths and commands, and untested runtime behavior.',
    ],
    useCases: [
      {
        title: 'Preparing a project for AI-assisted development',
        situation:
          'A repository has working code and documentation but needs clear coding-agent instructions.',
        prompt:
          'Use setting-up-agentic-projects in setup mode. Read existing instructions, skills, and approved project documentation. Create the smallest useful AGENTS.md and only essential adapters for tools already in use. Preserve configuration and application code. Verify paths and commands and report actual checks.',
        expectedOutput:
          'Concise project instructions, justified adapters, and a setup report with verification limits.',
      },
      {
        title: 'Audit conflicting instructions',
        situation: 'Several instruction files contain duplicated policies or stale references.',
        prompt:
          'Use setting-up-agentic-projects in audit mode. Do not edit files. Inspect our project instructions, installed skills, and tool configuration for conflicting policies, broken links, stale assumptions, and unnecessary permissions. Report prioritized findings with file evidence and small proposed corrections.',
        expectedOutput: 'An ordered read-only audit with evidence and a focused remediation plan.',
      },
      {
        title: 'Add another coding tool',
        situation: 'A team wants Claude Code alongside an existing Codex setup.',
        prompt:
          'Use setting-up-agentic-projects in migration mode. Add Claude Code alongside our existing Codex setup without duplicating project knowledge. Check current official configuration and discovery formats, preserve the original setup, and create only necessary adapters. Report native runtime checks that were not executed.',
        expectedOutput:
          'A minimal compatible adapter and a clear account of configuration and discovery verification.',
      },
    ],
    helpers: [
      {
        title: 'Read-only setup inventory',
        description:
          'Optional audit-project.mjs needs Node.js 18+ and uses a positional repository path, with optional --json. It inventories paths without reading file contents, skips secret files and directory symlinks, and reports bounded coverage.',
        path: 'scripts/audit-project.mjs',
      },
    ],
    references: [
      { title: 'Project discovery', path: 'references/project-discovery.md' },
      { title: 'Instruction design', path: 'references/instruction-design.md' },
      { title: 'Agents versus skills', path: 'references/agents-vs-skills.md' },
      { title: 'Tool compatibility', path: 'references/tool-compatibility.md' },
      { title: 'Scenario playbooks', path: 'references/scenarios.md' },
      { title: 'Validation checklist', path: 'references/validation-checklist.md' },
    ],
    relatedSkills: ['understanding-codebases', 'implementing-features', 'designing-frontend'],
    sourceUrl: `${repositoryUrl}/blob/main/skills/setting-up-agentic-projects/SKILL.md`,
  },
];

export const getSkill = (slug: string) => {
  return skills.find((skill) => skill.slug === slug);
};

export const getPackageFileUrl = (skill: Skill, path: string) => {
  return `${repositoryUrl}/blob/main/skills/${skill.packageName}/${path}`;
};

export const getSearchText = (skill: Skill) => {
  return [
    skill.title,
    skill.packageName,
    skill.summary,
    ...skill.useCases.flatMap((useCase) => [useCase.title, useCase.situation, useCase.prompt]),
  ]
    .join(' ')
    .toLowerCase();
};
