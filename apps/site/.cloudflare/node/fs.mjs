import fsPromises from 'fs/promises';

import pagesManifest from '../.asset-manifests/pages.mjs';
import snippetsManifest from '../.asset-manifests/snippets.mjs';

export function readdir(path, options, cb) {
  const withFileTypes = !!options.withFileTypes;

  if (!withFileTypes) {
    // TODO: also support withFileTypes false
    throw new Error('fs#readdir please call readdir with withFileTypes true');
  }

  const result = findInDirentLikes(path);

  const results =
    !result || result.type !== 'directory'
      ? []
      : result.children.map(c => ({
          name: c.name,
          parentPath: c.parentPath,
          path: c.path,
          isFile: () => c.type === 'file',
          isDirectory: () => c.type === 'directory',
        }));

  cb?.(null, results);
}

function findInDirentLikes(path) {
  if (!path.startsWith('/pages') && !path.startsWith('/snippets')) {
    return null;
  }

  // remove the leading `/`
  path = path.slice(1);

  const paths = path.split('/');

  const manifestType = paths.shift();

  const manifest = manifestType === 'pages' ? pagesManifest : snippetsManifest;

  return recursivelyFindInDirentLikes(paths, manifest);
  function recursivelyFindInDirentLikes(paths, direntLikes) {
    const [current, ...restOfPaths] = paths;
    const found = direntLikes.find(item => item.name === current);
    if (!found) return null;
    if (restOfPaths.length === 0) return found;
    if (found.type !== 'directory') return null;
    return recursivelyFindInDirentLikes(restOfPaths, found.children);
  }
}

export function exists(path, cb) {
  const result = existsImpl(path);
  cb(result);
}

export function existsSync(path) {
  const result = existsImpl(path);
  return result;
}

function existsImpl(path) {
  if (!path.startsWith('/pages') && !path.startsWith('/snippets')) {
    return false;
  }
  return !!findInDirentLikes(path);
}

export function realpathSync() {
  return true;
}

const cloudflareContextSymbol = Symbol.for('__cloudflare-context__');

export function createReadStream(path) {
  const { env } = global[cloudflareContextSymbol];
  // Note: we only care about the url's path, the domain is not relevant here
  const url = new URL(`/${path}`, 'http://0.0.0.0');
  return env.ASSETS.fetch(url);
}

export default {
  readdir,
  exists,
  existsSync,
  realpathSync,
  promises: fsPromises,
};
