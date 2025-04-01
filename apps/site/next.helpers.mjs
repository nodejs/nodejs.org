'use strict';

import { fileURLToPath } from 'node:url';

import { glob } from 'glob';

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
 * @param {Array<string>} ignore an array of glob patterns to ignore
 * @returns {Promise<Array<string>>} a promise containing an array of paths
 */
export const getMarkdownFiles = async (root, cwd, ignore = []) => {
  const cacheKey = `${root}${cwd}${ignore.join('')}`;

  if (!globCacheByPath.has(cacheKey)) {
    globCacheByPath.set(cacheKey, glob('**/*.{md,mdx}', { root, cwd, ignore }));
  }

  return globCacheByPath.get(cacheKey);
};
