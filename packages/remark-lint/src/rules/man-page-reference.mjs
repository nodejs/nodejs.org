import { DOC_MAN_BASE_URL } from '@doc-kit/core/generators/metadata/constants.mjs';
import { QUERIES } from '@doc-kit/core/utils/queries/index.mjs';

import { defineRule } from '../rule.mjs';

/**
 * @typedef Options
 * @property {boolean} code
 *   Report `name(section)` references written in code spans, which doc-kit
 *   only auto-links in plain text.
 * @property {boolean} links
 *   Report manual links to man pages, which auto-linking makes redundant.
 */

// A whole code span that doc-kit would auto-link, were it plain text
const CODE_REFERENCE = new RegExp(`^${QUERIES.unixManualPage.source}$`);
const MAN_URL = new RegExp(
  `^${DOC_MAN_BASE_URL.replace(/^https?:/, 'https?:').replace(/[.]/g, '\\.')}\\d/[a-z._-]+\\.\\d[a-z]?\\.html$`,
  'i'
);

/**
 * Whether a link's text is a bare `name(section)` reference, which doc-kit
 * auto-links on its own (it leaves code spans and other text alone).
 *
 * @param {import('mdast').Link | import('mdast').LinkReference} node
 */
const isPlainReference = node =>
  node.children.length === 1 &&
  node.children[0].type === 'text' &&
  CODE_REFERENCE.test(node.children[0].value);

export default defineRule({
  name: 'man-page-reference',
  description:
    'Plain `name(section)` references auto-link to their manual page, so linking them explicitly is redundant',
  // `code` is off by default: `name(n)` in a code span may be a call
  defaults: { code: false, links: true },
  /** @param {Options} options */
  run(context, { code, links }, file) {
    if (code) {
      const visit = node => {
        if (node.type === 'inlineCode' && CODE_REFERENCE.test(node.value)) {
          file.message(
            `Write \`${node.value}\` as plain text (without backticks) so it auto-links to its manual page`,
            node
          );
        }

        node.children?.forEach(visit);
      };

      visit(context.tree);
    }

    if (links) {
      const references = context.links
        .map(({ node }) => node)
        .filter(node => node.type === 'linkReference');

      for (const { node } of [...context.links, ...context.definitions]) {
        if (!node.url || !MAN_URL.test(node.url)) {
          continue;
        }

        const redundant =
          node.type === 'link'
            ? isPlainReference(node)
            : references.some(
                reference =>
                  reference.identifier === node.identifier &&
                  isPlainReference(reference)
              );

        if (redundant) {
          file.message(
            'Manual page links are generated automatically from `name(section)` references; remove the explicit link',
            node
          );
        }
      }
    }
  },
});
