import { transformTypeToReferenceLink } from '@nodejs/doc-kit/src/utils/parser/index.mjs';
import createQueries from '@nodejs/doc-kit/src/utils/queries/index.mjs';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';

const MATCH_RE = /\s\||\|\s/g;
const REPLACE_RE = /\s*\|\s*/g;

/**
 * Ensures that all type references are valid
 * @type {import('unified-lint-rule').Rule}
 */
const invalidTypeReference = (tree, vfile) => {
  visit(tree, createQueries.UNIST.isTextWithType, node => {
    const types = node.value.match(createQueries.QUERIES.normalizeTypes);

    types.forEach(type => {
      // Ensure wrapped in {}
      if (type[0] !== '{' || type[type.length - 1] !== '}') {
        vfile.message(
          `Type reference must be wrapped in "{}"; saw "${type}"`,
          node
        );

        node.value = node.value.replace(type, `{${type.slice(1, -1)}}`);
      }

      // Fix spaces around |
      if (MATCH_RE.test(type)) {
        vfile.message(
          `Type reference should be separated by "|", without spaces; saw "${type}"`,
          node
        );

        const normalized = type.replace(REPLACE_RE, '|');
        node.value = node.value.replace(type, normalized);
      }

      if (transformTypeToReferenceLink(type) === type) {
        vfile.message(`Invalid type reference: ${type}`, node);
      }
    });
  });
};

export default lintRule(
  'node-core:invalid-type-reference',
  invalidTypeReference
);
