import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';

// Define the required metadata keys that must be present in the Markdown content
const REQUIRED_KEYS = ['introduced_in', 'llm_description'];
const METADATA_CHECKS = REQUIRED_KEYS.map(
  key => new RegExp(`<!--\\s*${key}=.*?-->`)
);

/**
 * Ensures all needed metadata exists
 * @type {import('unified-lint-rule').Rule}
 */
const hasRequiredMetadata = (tree, vfile) => {
  const foundKeys = new Set();
  let hasParagraph = false;

  visit(tree, ['html', 'paragraph'], node => {
    if (node.type === 'html') {
      // Check if the HTML node contains any of the required metadata comments
      METADATA_CHECKS.forEach((regex, i) => {
        if (regex.test(node.value)) {
          foundKeys.add(REQUIRED_KEYS[i]);
        }
      });
    } else {
      // Mark that a paragraph exists in the document
      hasParagraph = true;
    }
  });

  REQUIRED_KEYS.forEach(key => {
    if (foundKeys.has(key)) {
      return;
    }

    // Allow llm_description to be provided as a first paragraph
    if (key === 'llm_description' && hasParagraph) {
      return;
    }

    vfile.message(`Missing "${key}" metadata`, tree);
  });
};

export default lintRule('node-core:required-metadata', hasRequiredMetadata);
