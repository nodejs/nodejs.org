import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';

// TODO(@avivkeller): This is re-used from doc-kit
// Regex to match "Stability: <number>" in blockquotes
const STABILITY = /Stability: ([0-5](?:\.[0-3])?)/;

/**
 * Finds and reports duplicate stability nodes
 * @type {import('unified-lint-rule').Rule}
 */
const duplicateStabilityNodes = (tree, vfile) => {
  let currentDepth = 0;
  let currentStability = -1;
  let currentHeaderDepth = 0;

  visit(tree, node => {
    // Update the current heading depth whenever a heading node is encountered
    if (node.type === 'heading') {
      currentHeaderDepth = node.depth;
    }

    // Look for blockquotes which may contain stability indicators
    if (node.type === 'blockquote') {
      // Assume the first child is a paragraph
      const paragraph = node.children?.[0];
      // And the first child of that paragraph is text
      const text = paragraph?.children?.[0];

      // Ensure structure is paragraph > text
      if (paragraph?.type === 'paragraph' && text?.type === 'text') {
        // Try to match "Stability: X"
        const match = text.value.match(STABILITY);
        if (match) {
          const stability = parseFloat(match[1]);
          // If the heading got deeper, and stability is valid and matches previous, report a duplicate
          if (
            currentHeaderDepth > currentDepth &&
            stability >= 0 &&
            stability === currentStability
          ) {
            vfile.message('Duplicate stability node', node);
          } else {
            // Otherwise, record this stability and heading depth
            currentDepth = currentHeaderDepth;
            currentStability = stability;
          }
        }
      }
    }
  });
};

export default lintRule(
  'node-core:duplicate-stability-nodes',
  duplicateStabilityNodes
);
