<p align="center">
  <img src="./apps/duck-gen-docs/public/og/root.png" alt="Duck Gen Logo" width="800"/>
</p>

# @duck-gen

`@duck-gen` is the GentleDuck monorepo for Duck Gen, Duck Query, and related developer tooling.
Published package scope remains `@gentleduck/*`.
 
## Documentation
- Website: https://gen.gentleduck.org
- GitHub: https://github.com/gentleeduck/duck-ui

## What's in the repo
### App
- `apps/duck-gen-docs` – Duck Gen docs site

### Packages
- `packages/duck-gen` – `@gentleduck/gen` type-safe API/message generator
- `packages/duck-query` – `@gentleduck/query` type-safe Axios client
- `packages/duck-ttest` – `@gentleduck/ttest` type-level testing utilities
- `packages/duck-skitch` – internal package
- `packages/sandbox-server` – internal sandbox server

### Published packages
- `@gentleduck/gen` – type-safe API and message generator (NestJS-tested)
- `@gentleduck/query` – type-safe Axios client
- `@gentleduck/ttest` – compile-time type testing utilities

## Getting Started
```bash
git clone https://github.com/gentleeduck/duck-ui.git
cd duck-gen
bun install
```

## Run docs locally
```bash
bun run --filter @gentleduck/gen-docs dev
```

## Contributing
We welcome contributions. Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

## License
MIT. See [`LICENSE`](./LICENSE) for more information.
