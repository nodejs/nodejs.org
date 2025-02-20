//@ts-check

import nodeFs from 'node:fs/promises';
import nodePath from 'node:path';

await collectAndCopyDirToAssets('./pages');
await collectAndCopyDirToAssets('./snippets');

/**
 * @param {string} path
 * @returns {Promise<void>}
 */
async function collectAndCopyDirToAssets(path) {
  await nodeFs.cp(path, nodePath.join('./.open-next/assets', path), {
    recursive: true,
    force: true,
  });

  const pagesChildren = await collectDirChildren(path);
  await nodeFs.mkdir('./.cloudflare/.asset-manifests/', { recursive: true });
  await nodeFs.writeFile(
    `./.cloudflare/.asset-manifests/${nodePath.basename(path)}.mjs`,
    `export default ${JSON.stringify(pagesChildren)}`
  );
}

/**
 * @param {string} path
 * @returns {Promise<DirentLike[]>}
 */
async function collectDirChildren(path) {
  const dirContent = await nodeFs.readdir(path, { withFileTypes: true });

  return Promise.all(
    dirContent.map(async item => {
      const base = {
        name: item.name,
        parentPath: item.parentPath,
      };
      if (item.isFile()) {
        return { ...base, type: 'file' };
      } else {
        const dirInfo = await collectDirChildren(
          `${item.parentPath}/${item.name}`
        );
        return { ...base, type: 'directory', children: dirInfo };
      }
    })
  );
}

/**
 * @typedef {{ name: string, parentPath: string } } DirentLikeBase
 * @typedef {DirentLikeBase & { type: 'file' }} DirentLikeFile
 * @typedef {DirentLikeBase & { type: 'directory', children: DirentLike[] }} DirentLikeDir
 * @typedef {DirentLikeFile|DirentLikeDir} DirentLike
 */
