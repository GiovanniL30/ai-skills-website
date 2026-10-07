# Agent Skills

A public catalog of five AI coding workflows, with skill guides, practical prompts, and installation instructions. The dashboard supports search and category filters; the installation page builds copyable commands for Codex, Claude Code, Cursor, and OpenCode.

This directory is an independent npm project and Git repository. The original `../.agents/skills` bundle and `../skills-lock.json` remain separate and unchanged.

## Local development

Use Node.js 24 LTS (see `.nvmrc`), npm 12, and Git for pre-commit hooks. No environment variables or external services are required.

From the parent directory:

```sh
cd agent-skills
npm ci
npm run dev
```

Open <http://localhost:3000>. On Windows PowerShell, use `npm.cmd` / `npx.cmd` if the execution policy blocks the `.ps1` wrappers.

| Command                | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Development server                               |
| `npm run build`        | Production build                                 |
| `npm start`            | Serve the production build                       |
| `npm run lint`         | ESLint, with zero warnings allowed               |
| `npm run lint:fix`     | Fix lint issues                                  |
| `npm run typecheck`    | Generate route types and check strict TypeScript |
| `npm run format`       | Format source and configuration with Prettier    |
| `npm run format:check` | Check formatting                                 |
| `npm run check`        | Type checking, linting, and formatting checks    |

Run `npm run build` before `npm start`. `npm ci` uses the committed lockfile and installs Husky hooks through the `prepare` script. The hook runs ESLint and Prettier on staged files. GitHub Actions runs `npm ci`, `npm run check`, and `npm run build`.

## Production URL and indexing

Set `SITE_URL` to the production origin **before building**, for example `https://your-domain.com`. Copy `.env.example` to `.env.local` for local configuration or set the variable through your deployment environment. Use an HTTP(S) origin without a path, credentials, query, or fragment. Invalid values fail early.

Without configuration the origin is `http://localhost:3000`. Every public page has a unique title, description, canonical URL, and Open Graph metadata. `src/app/sitemap.ts` lists the three index pages and five skill guides; `src/app/robots.ts` points to the sitemap. Rebuild after changing the origin. No production domain or hosting service has been configured.

## Editing catalog content

`src/lib/skills.ts` is the typed local source for all five packages. It supplies titles, exact package names, summaries, categories, when-to-use guidance, workflow steps, requirements, outputs, three practical use cases with prompts, optional helpers, references, related skills, source links, and search text. The dashboard, guides, use cases, navigation, metadata, and sitemap reuse this data. Category labels and example tasks are website editorial content; they do not claim to be package frontmatter or performance benchmarks.

Content was reviewed from [GiovanniL30/ai-skills](https://github.com/GiovanniL30/ai-skills) at commit `0a5128bddd1e7d8f179c45ea99f6ebf704f5072e`, including its README, the five `skills/*/SKILL.md` files, and relevant package references. The source repository is read-only. Page visits and builds use the local model and never fetch GitHub content.

To update content:

1. Read the source README, affected SKILL.md, and relevant references. Preserve package names and distinguish required access from optional helpers and maintainer tooling.
2. Edit the matching entry in `src/lib/skills.ts`. Keep at least three concrete use cases, accurate expected outputs, valid related slugs, and working source/reference paths. Update `sourceRevision` and this reviewed commit when refreshing the snapshot.
3. For a new package, update `skillSlugs`, add the typed entry, and add a category only when needed. Guides are generated with `generateStaticParams`; unknown slugs return 404.
4. Run `npm run check` and `npm run build`, then inspect affected guides and search results. Primary catalog and guide content must still appear with JavaScript disabled.

`src/lib/installation.ts` owns the centralized `/tree/main/skills` source and command generation. Interactive/project is the default. Explicit agents add `--agent <id> --copy`; global scope adds `--global`. Confirm future flag changes against the [official CLI documentation](https://github.com/vercel-labs/skills#options). The site only displays and copies commands; it never executes or installs skills. The source’s tested installer is `skills@1.7.1` (Node.js 22.20.0+), while generated commands intentionally use unpinned `npx skills` as requested. Optional skill helpers require Node.js 18+; maintainer tooling requirements do not apply to installed Markdown workflows.

## Verification

Run the configured lint, strict type-check, formatting, and production-build commands. Browser checks should cover all eight public routes, unknown-route 404s, catalog search/category combinations and reset, all skill/agent/scope command combinations, copy success and denied/unavailable clipboard recovery, mobile drawer keyboard behavior, responsive overflow, and on-page navigation. Confirm the complete catalog and guide content with JavaScript disabled and inspect page metadata, `sitemap.xml`, and `robots.txt`.

Browser checks use a temporary Playwright Core harness with the installed Chrome browser; no browser tooling or test framework is added to the application dependencies. Deployment, native agent discovery, and executing the documented installation commands are separate from website verification and are not claimed as tested.

## Conventions

- `src/app`: App Router routes, layouts, metadata, and global styles.
- `src/components`: Shared components; shadcn/ui source lives in `ui/`.
- `src/lib`: Shared utilities, including `cn()` for composing classes.
- `@/*` resolves to `src/*`; use it for imports across directories.
- Prefer Server Components. Add `'use client'` only for state, event handlers, or browser APIs, keeping interactive components small.
- Use strict TypeScript, named exports for shared components, and default exports where Next.js requires them. Prefer functions, `const`, type imports, and async/await.
- Use the Tailwind spacing scale and semantic shadcn tokens in `src/app/globals.css`: white surfaces, black text and primary buttons, neutral gray borders, and visible focus rings. The site starts in light mode with a system sans-serif font.
- Add shadcn/ui components with `npx shadcn@latest add @shadcn/<component>` from this directory. `components.json` records the Base UI primitives, Nova style, Lucide icons, CSS variables, and import aliases.

Setup follows the official [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [ESLint](https://nextjs.org/docs/app/api-reference/config/eslint), [Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs), and [shadcn/ui](https://ui.shadcn.com/docs/installation/next) documentation. ESLint 9 is retained for compatibility with Next.js's plugin peer dependencies. The installed ESLint skill supplies the import rules, Prettier conventions, editor integration, staged checks, and CI workflow.
