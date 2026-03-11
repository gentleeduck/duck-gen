<p align="center">
  <a href="https://gentleduck.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://gentleduck.org/logo-dark.svg">
      <img src="https://gentleduck.org/logo-light.svg" height="48" alt="Gentleduck">
    </picture>
  </a>
</p>

<p align="center">
  The official website, docs, and component playground for the <a href="https://gentleduck.org">Gentleduck</a> ecosystem.
</p>

<p align="center">
  <a href="https://gentleduck.org">Website</a> · <a href="https://github.com/gentleeduck/duck-www/issues">Issues</a> · <a href="./CONTRIBUTING.md">Contributing</a>
</p>

---

## About

**duck-www** is the monorepo powering [gentleduck.org](https://gentleduck.org) — the central hub for Gentleduck's open-source UI components, developer tools, and documentation. It houses the docs site, the local UI package, and all shared tooling configs used across the organization.

## Structure

```
apps/
  www/             → gentleduck.org (Next.js docs site)
packages/
  ui/              → @gentleduck/ui — component library
tooling/
  biome/           → shared Biome config
  tailwind/        → shared Tailwind config
  typescript/      → shared TypeScript config
  tsdown/          → shared tsdown config
  vitest/          → shared Vitest config
  github/          → GitHub automation
  bash/            → shell utilities
```

## Getting Started

> Requires **Node ≥ 22** and **Bun ≥ 1.3**.

```bash
git clone https://github.com/gentleeduck/duck-www.git
cd duck-www
bun install
bun dev
```

## Scripts

| Command | Description |
| --- | --- |
| `bun dev` | Start all workspace dev servers |
| `bun run build` | Build all packages and apps |
| `bun run check` | Run Biome linting and formatting checks |
| `bun run check-types` | TypeScript type checking |
| `bun run test` | Run tests across all workspaces |
| `bun run fix` | Auto-fix lint and formatting issues |
| `bun run ci` | Full CI pipeline (check → lint → types → test → build) |

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) + React 19
- **Styling** — [Tailwind CSS 4](https://tailwindcss.com)
- **Components** — [@gentleduck/ui](./packages/ui), built on [@gentleduck/primitives](https://github.com/gentleeduck/gentleduck)
- **Build** — [Turborepo](https://turbo.build) + [Bun](https://bun.sh)
- **Linting** — [Biome](https://biomejs.dev)
- **Testing** — [Vitest](https://vitest.dev)

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

## License

MIT — see [`LICENSE`](./LICENSE).
