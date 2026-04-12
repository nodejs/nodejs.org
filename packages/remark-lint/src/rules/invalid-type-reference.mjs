import { transformTypeToReferenceLink } from '@node-core/doc-kit/src/generators/metadata/utils/transformers.mjs';
import { QUERIES } from '@node-core/doc-kit/src/utils/queries/index.mjs';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';

const MATCH_RE = /\s\||\| /g;
const REPLACE_RE = /\s*\| */g;

/**
 * Ensures that all type references are valid
 * @type {import('unified-lint-rule').Rule<, import('../api.mjs').Options>}
 */
const invalidTypeReference = (tree, vfile, { typeMap = {} }) => {
  visit(
    tree,
    ({ value }) => QUERIES.normalizeTypes.test(value),
    node => {
      const types = node.value.match(QUERIES.normalizeTypes);

      types.forEach(type => {
        // Ensure wrapped in {}
        if (type[0] !== '{' || type[type.length - 1] !== '}') {
          vfile.message(
            `Type reference must be wrapped in "{}"; saw "${type}"`,
            node
          );

          const newType = `{${type.slice(1, -1)}}`;
          node.value = node.value.replace(type, newType);
          type = newType;
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

        if (transformTypeToReferenceLink(type, typeMap) === type) {
          vfile.message(`Invalid type reference: ${type}`, node);
        }
      });
    }
  );
};

export default lintRule(
  'node-core:invalid-type-reference',
  invalidTypeReference
);
