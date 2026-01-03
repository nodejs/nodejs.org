'use strict';

import { glob } from 'node:fs/promises';
import { join } from 'node:path';

import { defaultLocale } from '@node-core/website-i18n/index.mjs';

export const CONTENT_ROOT = join(process.cwd(), 'pages');

/**
 * This method is responsible for retrieving a glob of all files that exist
 * within a given language directory
 *
 * Note that we ignore the blog directory for static builds as otherwise generating
 * that many pages would be too much for the build process to handle.
 *
 * @param {import('node:fs').GlobOptions} options
 * @returns {Promise<Array<string>>} a promise containing an array of paths
 */
export const getMarkdownFiles = async (options = {}) => {
  return Array.fromAsync(
    glob('**/*.{md,mdx}', {
      cwd: join(CONTENT_ROOT, defaultLocale.code),
      ...options,
    })
  );
};
