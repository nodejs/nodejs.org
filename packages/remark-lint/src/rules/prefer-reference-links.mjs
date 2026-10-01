import { transformNodesToString } from '@doc-kit/core/utils/unist.mjs';

import { defineRule } from '../rule.mjs';

/**
 * @typedef Options
 * @property {boolean} ignoreFragments
 *   Allow inline links to fragments of the current document.
 */

export default defineRule({
  name: 'prefer-reference-links',
  description: 'Links use collapsed reference style',
  defaults: { ignoreFragments: true },
  /** @param {Options} options */
  run(context, { ignoreFragments }, file) {
    for (const { node } of context.links) {
      if (node.type !== 'link') {
        continue;
      }

      // Autolinks (`<https://example.com>`) are not inline links
      if (transformNodesToString(node.children) === node.url) {
        continue;
      }

      if (ignoreFragments && node.url.startsWith('#')) {
        continue;
      }

      file.message(
        'Prefer a reference-style link (`[text][]`) with a definition at the end of the document',
        node
      );
    }
  },
});
