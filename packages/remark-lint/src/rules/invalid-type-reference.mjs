import { transformTypeToReferenceLink } from '@nodejs/doc-kit/src/utils/parser/index.mjs';
import createQueries from '@nodejs/doc-kit/src/utils/queries/index.mjs';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';

const SPACED_SEPERATOR_RE = /\s\||\|\s/g;

/**
 * Ensures that all type references are valid
 * @type {import('unified-lint-rule').Rule}
 */
const invalidTypeReference = (tree, vfile) => {
  visit(tree, createQueries.UNIST.isTextWithType, node => {
    const types = node.value.match(createQueries.QUERIES.normalizeTypes);

    types.forEach(type => {
      if (type[0] !== '{' || type.at(-1) !== '}') {
        vfile.message(
          `Type reference must be wrapped in "{}"; saw "${type}"`,
          node
        );
      }

      if (SPACED_SEPERATOR_RE.test(type)) {
        vfile.message(
          `Type reference should be seperated by "|", without spaces; saw "${type}"`
        );
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
