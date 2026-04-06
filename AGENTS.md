# AGENTS.md

## Cursor Cloud specific instructions

### Project Overview

This is the **Node.js official website** (nodejs.org), a pnpm monorepo with Turborepo. Single product in `apps/site` (Next.js), plus shared packages in `packages/`.

### Prerequisites

- **Node.js v24** (see `.nvmrc`)
- **pnpm 10.33.0** (see `packageManager` in root `package.json`)

### Key Commands

All standard commands are documented in `docs/getting-started.md`. Quick reference:

| Task         | Command                                    |
| ------------ | ------------------------------------------ |
| Install deps | `pnpm install --frozen-lockfile`           |
| Dev server   | `pnpm dev` (runs at http://localhost:3000) |
| Lint         | `pnpm lint`                                |
| Format + fix | `pnpm format`                              |
| Unit tests   | `pnpm test`                                |
| Build        | `pnpm build`                               |

### Non-obvious Caveats

- The root `/` route returns a 307 redirect to `/en`. Always test against `http://localhost:3000/en` for a 200 response.
- The dev server compiles pages on-demand (Turbopack). The first page load after `pnpm dev` takes ~15 seconds; subsequent loads are fast.
- No databases, Docker, or external services are required for local development. Search uses Orama Cloud with hardcoded public dev keys.
- The pre-commit hook runs `node --run lint:staged` and `node --run lint:types`. Ensure these pass before committing.
- `pnpm test` maps to `turbo test:unit` which runs the Node.js built-in test runner (not Jest/Vitest). Tests use `node:test` and `node:assert`.
- When using nvm, after switching to Node.js v24 you need to ensure pnpm is available (via `corepack enable && corepack prepare pnpm@10.33.0 --activate`).
