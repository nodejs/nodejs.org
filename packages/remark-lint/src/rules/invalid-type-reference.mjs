import { transformTypeToReferenceLink } from '@nodejs/doc-kit/src/utils/parser/index.mjs';
import createQueries from '@nodejs/doc-kit/src/utils/queries/index.mjs';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';

/**
 * Ensures that all self-references begin with `#`
 * @type {import('unified-lint-rule').Rule}
 */
const invalidTypeReference = (tree, vfile) => {
  visit(tree, createQueries.UNIST.isTextWithType, node => {
    const types = node.value.match(createQueries.QUERIES.normalizeTypes);

    types.forEach(type => {
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
