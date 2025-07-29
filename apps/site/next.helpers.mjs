'use strict';

import { glob } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * We create a locale cache of Glob Promises
 * to avoid reading the file system multiple times
 * this is done since we don't need to constantly re-run the glob
 * query as it is only needed once
 *
 * @type {Map<string, Promise<string>>} */
const globCacheByPath = new Map();

/**
 * This gets the relative path from `import.meta.url`
 *
 * @param {string} path the current import path
 * @returns {string} the relative path from import
 */
export const getRelativePath = path => fileURLToPath(new URL('.', path));

/**
 * This method is responsible for retrieving a glob of all files that exist
 * within a given language directory
 *
 * Note that we ignore the blog directory for static builds as otherwise generating
 * that many pages would be too much for the build process to handle.
 *
 * @param {string} root the root directory to search from
 * @param {string} cwd the given locale code
 * @param {Array<string>} exclude an array of glob patterns to ignore
 * @returns {Promise<Array<string>>} a promise containing an array of paths
 */
export const getMarkdownFiles = async (root, cwd, exclude = []) => {
  const cacheKey = `${root}${cwd}${exclude.join('')}`;

  if (!globCacheByPath.has(cacheKey)) {
    const result = Array.fromAsync(
      glob('**/*.{md,mdx}', { root, cwd, exclude })
    );

    globCacheByPath.set(cacheKey, result);
  }

  return globCacheByPath.get(cacheKey);
};
