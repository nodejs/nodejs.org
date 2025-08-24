import { lintRule } from 'unified-lint-rule';

const getDefinitionsRecursively = function* (node) {
  if (node.type === 'definition') {
    yield node;
  }

  const { children = [] } = node;

  for (const child of children) {
    yield* getDefinitionsRecursively(child);
  }
};

/**
 * Ensures references are alphabetical.
 * @type {import('unified-lint-rule').Rule}
 */
const orderedReferences = (tree, vfile) => {
  let previousLabel;

  for (const node of getDefinitionsRecursively(tree)) {
    const { label } = node;

    if (previousLabel && previousLabel > label) {
      vfile.message(
        `Unordered reference ("${label}" should be before "${previousLabel}")`,
        node
      );
    }

    previousLabel = label;
  }
};

export default lintRule('node-core:ordered-references', orderedReferences);
