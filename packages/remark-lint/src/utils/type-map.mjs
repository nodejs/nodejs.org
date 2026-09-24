import { readFile } from 'node:fs/promises';
import { isAbsolute, resolve } from 'node:path';

const cache = new Map();

/**
 * Loads a type map (spec §8.3): either an object, a path to a JSON file, or
 * an `http(s):`/`file:` URL. Loaded maps are cached for the process.
 *
 * @param {Record<string, string> | string | URL | undefined} source
 * @param {string} cwd
 * @returns {Promise<Record<string, string>>}
 */
export const loadTypeMap = async (source, cwd) => {
  if (!source) {
    return {};
  }

  if (typeof source === 'object' && !(source instanceof URL)) {
    return source;
  }

  const key = String(source);

  if (!cache.has(key)) {
    cache.set(
      key,
      load(source, cwd).catch(error => {
        cache.delete(key);
        throw error;
      })
    );
  }

  return cache.get(key);
};

/**
 * @param {string | URL} source
 * @param {string} cwd
 */
const load = async (source, cwd) => {
  const url = source instanceof URL ? source : URL.parse(source);

  if (url && url.protocol !== 'file:') {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to load type map from ${url}: ${response.status}`
      );
    }

    return response.json();
  }

  const path =
    url ?? (isAbsolute(String(source)) ? source : resolve(cwd, String(source)));

  return JSON.parse(await readFile(path, 'utf8'));
};
