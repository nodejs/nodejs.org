/**
 * `@node-core/rehype-shiki` options for self-hosted deployments, where both
 * defaults work: the WASM engine is the faster of the two, and Twoslash can
 * use the real filesystem. Cloudflare overrides both (see
 * `platforms/cloudflare/shiki.mjs`).
 */
export const shikiOptions = { wasm: true, twoslash: true };
