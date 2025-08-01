import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';

const requiredKeys = ['introduced_in', 'llm_description'];
const checks = requiredKeys.map(key => new RegExp(`<!--\\s*${key}=.*?-->`));

const hasRequiredMetadata = (tree, vfile) => {
  const found = new Set();
  let paragraphFound = false;

  visit(tree, ['html', 'paragraph'], node => {
    if (node.type === 'html') {
      checks.forEach((check, i) => {
        if (new RegExp(check).test(node.value)) {
          found.add(requiredKeys[i]);
        }
      });
    } else if (node.type === 'paragraph') {
      paragraphFound = true;
    } else {
      // Continue searching
      return false;
    }
  });

  requiredKeys
    .filter(key => !found.has(key))
    .forEach(missingKey => {
      // The first paragraph can also be the LLM description.
      if (missingKey === 'llm_description' && paragraphFound) {
        return;
      }

      vfile.message(`Missing "${missingKey}" metadata`, tree);
    });
};

export default lintRule('node-core:required-metadata', hasRequiredMetadata);
