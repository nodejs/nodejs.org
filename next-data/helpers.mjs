'use strict';

import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

export const getMatchingRoutes = (route = '', matches = []) =>
  matches.some(match => route === match);

/**
 * This method is responsible for reading all immediate subdirectories of a directory
 *
 * @param {string} root the root directory to search from
 * @param {string} cwd the current working directory
 * @returns {Promise<string[]>} a promise containing an array of directories
 */
export const getDirectories = async (root, cwd) => {
  return glob('*', { root, cwd, withFileTypes: true })
    .then(d => d.filter(e => e.isDirectory()))
    .then(d => d.map(e => e.name));
};

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
 * @param {string[]} ignore an array of glob patterns to ignore
 * @returns {Promise<string[]>} a promise containing an array of paths
 */
export const getMarkdownFiles = async (root, cwd, ignore = []) => {
  return glob('**/*.{md,mdx}', { root, cwd, ignore })
    .then(files => files.map(file => file.replace(/(\/index)?\.mdx?$/, '')))
    .then(files => files.filter(file => file.length));
};

/**
 * This method is responsible for checking a combination
 * of extensions in a given list and tests a list of extensions
 * that could match that file.
 *
 * If no matching extension is found an empty string is returned
 * which signals that the find was not found
 *
 * @param {string} filename the filename without extension/suffixes
 * @param {string[]} extensions an array of suffixes to be tested
 * @returns {string} the filename with the first matching extension
 */
export const checkFileExists = (filename, extensions) => {
  const extension = extensions.find(e => existsSync(`${filename}${e}`));

  return extension ? `${filename}${extension}` : '';
};
