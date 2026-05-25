'use strict';

/**
 * Creates a Twoslash instance backed by a virtual filesystem for environments
 * without real filesystem access (e.g. Cloudflare Workers).
 *
 * Uses a pre-built JSON map of TypeScript lib declarations and @types/node
 * generated at build time by `scripts/twoslash-fsmap/index.mjs`.
 */
export async function createVfsTwoslasher() {
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
