'use strict';

import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';

const require = createRequire(import.meta.url);

/**
 * Recursively collects all `.d.ts` files from a directory into the fsMap.
 *
 * @param {Record<string, string>} fsMap The map to populate
 * @param {string} dir The directory to walk
 * @param {string} virtualPrefix The virtual path prefix (e.g., "/node_modules/@types/node")
 * @param {string} baseDir The base directory for computing relative paths
 */
function collectDtsFiles(fsMap, dir, virtualPrefix, baseDir) {
  const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      collectDtsFiles(fsMap, fullPath, virtualPrefix, baseDir);
    } else if (entry.isFile() && /\.d\.([^.]+\.)?[cm]?ts$/i.test(entry.name)) {
      const relativePath = fullPath.slice(baseDir.length).replace(/\\/g, '/');
      const virtualPath = `${virtualPrefix}${relativePath}`;

      fsMap[virtualPath] = readFileSync(fullPath, 'utf8');
    }
  }
}

/**
 * Generates a virtual filesystem map containing all TypeScript library
 * declaration files and `@types/node` declarations needed for Twoslash
 * to run without real filesystem access (e.g., on Cloudflare Workers).
 *
 * @returns {Record<string, string>} A map of virtual paths to file contents
 */
export default function generateTwoslashFsMap() {
  const fsMap = {};

  // 1. Collect TypeScript lib .d.ts files
  //    These are keyed as "/lib.es5.d.ts", "/lib.dom.d.ts", etc.
  //    (matching the convention used by @typescript/vfs)
  const tsLibDir = dirname(require.resolve('typescript/lib/lib.d.ts'));
  const tsLibFiles = readdirSync(tsLibDir)
    .filter(f => f.startsWith('lib.') && /\.d\.([^.]+\.)?[cm]?ts$/i.test(f))
    .sort();

  for (const file of tsLibFiles) {
    fsMap[`/${file}`] = readFileSync(join(tsLibDir, file), 'utf8');
  }

  // 2. Collect @types/node .d.ts files
  //    These are keyed as "/node_modules/@types/node/index.d.ts", etc.
  const typesNodeDir = resolve(
    require.resolve('@types/node/package.json'),
    '..'
  );

  collectDtsFiles(
    fsMap,
    typesNodeDir,
    '/node_modules/@types/node',
    typesNodeDir
  );

  return fsMap;
}
