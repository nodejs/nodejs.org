'use strict';

import rehypeShikiji from '@node-core/rehype-shiki/plugin';
import remarkHeadings from '@vcarl/remark-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import readingTime from 'remark-reading-time';

import remarkTableTitles from '../util/table';

// TODO(@avivkeller): When available, use `OPEN_NEXT_CLOUDFLARE` environment
// variable for detection instead of current method, which will enable better
// tree-shaking.
// Reference: https://github.com/nodejs/nodejs.org/pull/7896#issuecomment-3009480615
const OPEN_NEXT_CLOUDFLARE = 'Cloudflare' in global;

/**
 * Creates a Twoslash instance backed by a virtual filesystem for environments
 * without real filesystem access (e.g. Cloudflare Workers).
 *
 * Uses a pre-built JSON map of TypeScript lib declarations and @types/node
 * generated at build time by `scripts/twoslash-fsmap/index.mjs`.
 */
async function createVfsTwoslasher() {
  const [{ createTwoslasher }, ts, fsMapJson] = await Promise.all([
    import('twoslash/core'),
    import('typescript').then(m => m.default),
    import('../generated/twoslash-fsmap.json', { with: { type: 'json' } }).then(
      m => m.default
    ),
  ]);

  const fsMap = new Map(Object.entries(fsMapJson));

  return createTwoslasher({
    fsMap,
    tsModule: ts,
    vfsRoot: '/',
    compilerOptions: {
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      // Explicitly include @types/node so that the VFS resolves Node.js
      // globals and `node:*` module imports from the bundled declarations.
      types: ['node'],
    },
  });
}

// Shiki is created out here to avoid an async rehype plugin
const singletonShiki = await rehypeShikiji({
  // We use the faster WASM engine on the server instead of the web-optimized version.
  //
  // Currently we fall back to the JavaScript RegEx engine
  // on Cloudflare workers because `shiki/wasm` requires loading via
  // `WebAssembly.instantiate` with custom imports, which Cloudflare doesn't support
  // for security reasons.
  wasm: !OPEN_NEXT_CLOUDFLARE,

  twoslash: true,

  // On Cloudflare Workers, the default filesystem-backed Twoslash cannot work
  // because there is no real filesystem. Instead, we provide a custom twoslasher
  // backed by an in-memory VFS pre-populated at build time with TypeScript
  // lib declarations and @types/node.
  twoslashOptions: OPEN_NEXT_CLOUDFLARE
    ? { twoslasher: await createVfsTwoslasher() }
    : undefined,
});

/**
 * Provides all our Rehype Plugins that are used within MDX
 */
export const rehypePlugins = [
  // Generates `id` attributes for headings (H1, ...)
  rehypeSlug,
  // Automatically add anchor links to headings (H1, ...)
  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  // Transforms sequential code elements into code tabs and
  // adds our syntax highlighter (Shikiji) to Codeboxes
  () => singletonShiki,
];

/**
 * Provides all our Remark Plugins that are used within MDX
 */
export const remarkPlugins = [
  // Support GFM syntax to be used within Markdown
  remarkGfm,
  // Generates metadata regarding headings
  remarkHeadings,
  // Calculates the reading time of the content
  readingTime,
  remarkTableTitles,
];
