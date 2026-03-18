import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';

const DEPRECATION_COMMENT = /^<!-- md-lint skip-deprecation (DEP\d{4}) -->$/;
const DEPRECATION_HEADING = /^(DEP\d{4}):/;
const DEPRECATION_YAML = /^<!-- YAML\r?\nchanges:\r?\n/;

const generateDeprecation = code => `DEP${code.toString().padStart(4, '0')}`;

/**
 * Ensures all needed metadata exists
 * @type {import('unified-lint-rule').Rule}
 */
const invalidDeprecations = (tree, vfile) => {
  if (vfile.stem !== 'deprecations') {
    // Skip non-deprecation files
    return;
  }

  let expectedDeprecationCode = 1;

  visit(tree, ['heading', 'html'], (node, idx, parent) => {
    // Get the current deprecation
    const deprecationCode =
      node.type === 'html'
        ? node.value.match(DEPRECATION_COMMENT)?.[1]
        : node.children[0].value.match(DEPRECATION_HEADING)?.[1];

    if (node.type === 'heading') {
      const typeNode = parent.children[idx + 1]?.children[0];

      if (!typeNode?.value?.startsWith('Type:')) {
        vfile.message(
          `Deprecation "${deprecationCode}" is missing a "Type"`,
          node
        );
      }

      const changesNode = parent.children[idx + 2];

      if (!DEPRECATION_YAML.test(changesNode?.value)) {
        vfile.message(
          `Deprecation "${deprecationCode}" is missing changes`,
          node
        );
      }
    }

    // If not found, skip
    if (!deprecationCode) {
      return;
    }

    const generatedDeprecationCode = generateDeprecation(
      expectedDeprecationCode
    );

    if (deprecationCode !== generatedDeprecationCode) {
      vfile.message(
        `Deprecation codes are out of order. Expected ${generatedDeprecationCode}, saw "${deprecationCode}"`,
        node
      );
    }

    expectedDeprecationCode++;
  });
};

export default lintRule('node-core:invalid-deprecations', invalidDeprecations);
