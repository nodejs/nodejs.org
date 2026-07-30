import { createVfsTwoslasher } from './create-vfs-twoslasher.mjs';

/**
 * `@node-core/rehype-shiki` options for Cloudflare Workers, where two of the
 * defaults cannot work:
 *
 * - `shiki/wasm` requires loading via `WebAssembly.instantiate` with custom
 *   imports, which Cloudflare doesn't support for security reasons, so we
 *   fall back to the JavaScript RegExp engine.
 * - The default filesystem-backed Twoslash cannot work because there is no
 *   real filesystem. Instead, we provide a custom twoslasher backed by an
 *   in-memory VFS pre-populated at build time with TypeScript lib
 *   declarations and `@types/node` (see `scripts/twoslash-fsmap`).
 */
export const shikiOptions = {
  wasm: false,
  twoslash: true,
  twoslashOptions: { twoslasher: await createVfsTwoslasher() },
};
