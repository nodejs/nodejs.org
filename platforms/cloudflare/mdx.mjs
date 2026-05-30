// Cloudflare workers can't load `shiki/wasm` via `WebAssembly.instantiate` with
// custom imports, so fall back to the JavaScript RegEx engine. Twoslash pulls
// Node.js filesystem modules into the Worker bundle during OpenNext page-data
// collection, so keep code highlighting enabled without Twoslash on Cloudflare.
export const shikiOptions = {
  wasm: false,
  twoslash: false,
};
