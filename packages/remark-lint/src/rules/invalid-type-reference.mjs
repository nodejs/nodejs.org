import { resolveTypeReference } from '@doc-kit/core/src/generators/metadata/utils/transformers.mjs';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';

const TYPE_RE = /(\{|<)(?! )[^<({})>]+(?! )(\}|>)/g;
// Excludes HTML comments, closing tags and tags with attributes
const HTML_TYPE_RE = /^<[^\s!/=]+>$/;
const MATCH_RE = /\s\||\| /g;
const REPLACE_RE = /\s*\| */g;

const isTypeNode = node => {
  if (node.type === 'text') {
    return TYPE_RE.test(node.value);
  }

  if (node.type === 'html') {
    return (
      HTML_TYPE_RE.test(node.value) &&
      node.value.match(TYPE_RE)?.includes(node.value)
    );
  }

  return false;
};

/**
 * Whether at least one member of a `{type}` reference links somewhere
 * @param {string} type
 * @param {Record<string, string>} typeMap
 * @returns {boolean}
 */
const isResolvable = (type, typeMap) =>
  type
    .slice(1, -1)
    .split('|')
    .some(piece => {
      const name = piece.trim().replace(/\[\]$/, '');

      return name.length > 0 && resolveTypeReference(name, typeMap) !== '';
    });

/**
 * Ensures that all type references are valid
 * @type {import('unified-lint-rule').Rule<, import('../api.mjs').Options>}
 */
const invalidTypeReference = (tree, vfile, { typeMap = {} }) => {
  visit(tree, isTypeNode, node => {
    const types = node.value.match(TYPE_RE);

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

      if (!isResolvable(type, typeMap)) {
        vfile.message(`Invalid type reference: ${type}`, node);
      }
    });
  });
};

export default lintRule(
  'node-core:invalid-type-reference',
  invalidTypeReference
);
