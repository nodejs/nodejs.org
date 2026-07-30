/**
 * `@node-core/rehype-shiki` options for the Vercel deployment. Vercel runs a
 * regular Node.js server, so both defaults work and these match the
 * self-hosted options (see `platforms/default/shiki.mjs`). They are repeated
 * rather than re-exported so the platform packages stay independent of one
 * another — a deployment installs only its own (see the `installCommand` in
 * `vercel.json`).
 */
export const shikiOptions = { wasm: true, twoslash: true };
