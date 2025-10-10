import createQueries from '@nodejs/doc-kit/src/utils/queries/index.mjs';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';

/**
 * Finds and reports duplicate stability nodes
 * @type {import('unified-lint-rule').Rule}
 */
const duplicateStabilityNodes = (tree, vfile) => {
  // Map depth → stability string recorded at that depth
  const stabilityByDepth = new Map();
  let currentHeadingDepth = 0; // Current heading depth (0 for "no heading")

  visit(tree, ['heading', 'blockquote'], node => {
    if (node.type === 'heading') {
      // Update heading depth and clear deeper recorded stabilities
      currentHeadingDepth = node.depth;
      for (const depth of stabilityByDepth.keys()) {
        if (depth >= currentHeadingDepth) {
          stabilityByDepth.delete(depth);
        }
      }
      return;
    }

    // Handle blockquotes: extract text from paragraph > text structure
    const text = node.children?.[0]?.children?.[0]?.value;
    if (!text) {
      return;
    }

    const match = createQueries.QUERIES.stabilityIndexPrefix.exec(text); // Match "Stability: X"
    if (!match) {
      return;
    }

    const stability = match[1];
    // Report if a duplicate stability exists in a parent heading depth
    for (const [depth, prevStability] of stabilityByDepth) {
      if (depth < currentHeadingDepth && prevStability === stability) {
        vfile.message('Duplicate stability node', node);
        break;
      }
    }

    stabilityByDepth.set(currentHeadingDepth, stability);
  });
};

export default lintRule(
  'node-core:duplicate-stability-nodes',
  duplicateStabilityNodes
);
