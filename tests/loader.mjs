import { existsSync } from 'fs';
import { extname } from 'path';
import { fileURLToPath } from 'url';

const requiredCode = `import * as React from 'react';`;
const css = new URL('mocks/css.mjs', import.meta.url).href;

const indexFiles = ['index.tsx', 'index.ts', 'index.mjs', 'index.js'];

/**
 *
 * This hook intercepts module resolution, allowing us to handle
 * CSS/SCSS files in a custom way. Instead of actually loading the CSS,
 * we short-circuit the resolution and return a mock module.
 *
 * It also maps directory targets of import maps to their index file.
 *
 * @type {import('node:module').ResolveHook}
 */
export async function resolve(specifier, ctx, nextResolve) {
  const ext = extname(specifier);
  if (ext === '.css' || ext === '.scss') {
    // For CSS/SCSS, return the mock CSS module and skip default resolution.
    return {
      format: 'module',
      url: css,
      shortCircuit: true,
    };
  }

  try {
    return await nextResolve(specifier);
  } catch (error) {
    if (error.code !== 'ERR_UNSUPPORTED_DIR_IMPORT') {
      throw error;
    }

    const index = indexFiles
      .map(file => new URL(file, `${error.url}/`))
      .find(url => existsSync(fileURLToPath(url)));

    if (!index) {
      throw error;
    }

    return nextResolve(index.href);
  }
}

/**
 *
 * This hook is used to modify the source of JSX/TSX files on the fly.
 * We prepend the necessary React import to ensure React is available,
 * which is required for JSX to work without explicitly importing React.
 *
 * @type {import('node:module').LoadHook}
 */
export async function load(url, ctx, nextLoad) {
  const ext = extname(url);
  const result = await nextLoad(url, ctx);

  if (ext === '.jsx' || ext === '.tsx') {
    // Ensure React is in scope for JSX transforms.
    result.source = requiredCode + result.source;
  }

  return result;
}
