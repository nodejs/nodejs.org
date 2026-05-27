import { createVfsTwoslasher } from './create-vfs-twoslasher.mjs';

// Cloudflare workers can't load `shiki/wasm` via `WebAssembly.instantiate` with
// custom imports, so fall back to the JavaScript RegEx engine. Twoslash needs
// a VFS since there's no real filesystem at runtime; we provide one backed by
// a JSON map built at deploy time from the TypeScript lib declarations and
// `@types/node`.
export const shikiOptions = {
  wasm: false,
  twoslash: true,
  twoslashOptions: { twoslasher: await createVfsTwoslasher() },
};
