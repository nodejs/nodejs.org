import rehypeShikiji from '@node-core/rehype-shiki/plugin';

// TODO(@avivkeller): When available, use `OPEN_NEXT_CLOUDFLARE` environment
// variable for detection instead of current method, which will enable better
// tree-shaking.
// Reference: https://github.com/nodejs/nodejs.org/pull/7896#issuecomment-3009480615
const OPEN_NEXT_CLOUDFLARE = 'Cloudflare' in global;

// Shiki is created out here to avoid an async rehype plugin
const shiki = await rehypeShikiji({
  // We use the faster WASM engine on the server instead of the web-optimized version.
  //
  // Currently we fall back to the JavaScript RegEx engine
  // on Cloudflare workers because `shiki/wasm` requires loading via
  // `WebAssembly.instantiate` with custom imports, which Cloudflare doesn't support
  // for security reasons.
  wasm: !OPEN_NEXT_CLOUDFLARE,

  // TODO(@avivkeller): Find a way to enable Twoslash w/ a VFS on Cloudflare
  twoslash: !OPEN_NEXT_CLOUDFLARE,
});

export default () => shiki;
