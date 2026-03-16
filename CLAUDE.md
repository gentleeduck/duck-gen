# CLAUDE.md - duck-gen

## React Grab (Dev Tool)

React Grab is loaded in development mode via an unpkg script in the docs app layout (`apps/duck-gen-docs/app/layout.tsx`). It is only included when `NODE_ENV === 'development'` and requires no additional setup. Do not remove or modify the script tag unless replacing the tool entirely.

## Monorepo Structure

This is a Bun + Turborepo monorepo. Workspaces live in three directories:

- `apps/` - Applications
  - `duck-gen-docs` - Next.js documentation site
- `packages/` - Published packages
  - `duck-gen` - Core code-generation library
  - `duck-query` - Query utilities
  - `duck-skitch` - Skitch tooling
  - `duck-ttest` - Testing utilities
  - `sandbox-server` - Development sandbox server
  - `ui` - Shared UI components
- `tooling/` - Internal tooling configs
  - `bash`, `biome`, `github`, `tailwind`, `tsdown`, `typescript`, `vitest`

## Build & Dev Commands

All commands run from the repo root:

```sh
bun run dev          # Start all apps/packages in dev mode (turbo)
bun run build        # Build everything (turbo, cached)
bun run test         # Run tests (turbo, cached)
bun run check        # Biome check
bun run lint         # Biome lint
bun run format       # Biome format (auto-fix)
bun run fix          # Biome check --write (lint + format fix)
bun run check-types  # TypeScript type checking (turbo)
bun run ci           # Full CI pipeline: check, lint:ws, check-types, test, build
bun run clean        # Remove dist, .cache, .turbo, node_modules, .next, .velite
```

## Conventions

- **Package manager**: Bun (v1.3.5+). Use `bun install`, not npm/yarn/pnpm.
- **Formatter/Linter**: Biome 2.x (see `biome.json`). Single quotes, semicolons as-needed, trailing commas, 2-space indent, 120 char line width.
- **TypeScript**: v5.9+. Strict mode. Use `import type` for type-only imports (enforced by Biome).
- **React**: v19. Use function components exclusively.
- **Styling**: Tailwind CSS v4. Use `cn()` from `@gentleduck/libs/cn` for class merging.
- **No `var`**: `noVar` is an error. Use `const`/`let`.
- **Unused imports**: Treated as errors by Biome.
- **Changesets**: Use `bun run changeset` for versioning. Do not manually edit changelogs.

## Git

- Do not add Co-Authored-By trailers to commits.
- Commit messages follow conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, etc.
