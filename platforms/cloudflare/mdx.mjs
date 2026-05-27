// Cloudflare workers can't load `shiki/wasm` via `WebAssembly.instantiate` with
// custom imports, and twoslash needs a VFS we don't have here, so disable both
// and fall back to the JavaScript RegEx engine.
export const shikiOptions = {
  wasm: false,
  twoslash: false,
};
