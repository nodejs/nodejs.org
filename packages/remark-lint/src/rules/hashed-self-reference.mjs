import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { lintRule } from 'unified-lint-rule';

const getLinksRecursively = function* (node) {
  if (node.url) {
    yield node;
  }

  const { children = [] } = node;

  for (const child of children) {
    yield* getLinksRecursively(child);
  }
};

/**
 * Ensures that all self-references begin with `#`
 * @type {import('unified-lint-rule').Rule}
 */
const hashedSelfReference = (tree, vfile) => {
  const currentFileURL = pathToFileURL(
    path.isAbsolute(vfile.path) ? vfile.path : path.join(vfile.cwd, vfile.path)
  );

  for (const node of getLinksRecursively(tree)) {
    const { url } = node;

    if (!url || url[0] === '#') {
      continue;
    }

    const targetURL = new URL(url, currentFileURL);

    if (targetURL.pathname === currentFileURL.pathname) {
      const expected = url.includes('#') ? url.slice(url.indexOf('#')) : '#';

      vfile.message(
        `Self-reference must start with hash (expected "${expected}", got "${url}")`,
        node
      );
    }
  }
};

export default lintRule('node-core:hashed-self-reference', hashedSelfReference);
