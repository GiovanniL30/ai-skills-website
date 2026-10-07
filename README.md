# Agent Skills

Foundation for a public catalog of AI coding skills, use cases, and installation instructions. Catalog and documentation pages will be added later.

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
