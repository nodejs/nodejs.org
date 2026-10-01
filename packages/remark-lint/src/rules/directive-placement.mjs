import { defineRule } from '../rule.mjs';

/**
 * @typedef Options
 * @property {Array<string>} documentKeys
 *   Directives that describe the document and must follow the title.
 */

export default defineRule({
  name: 'directive-placement',
  description:
    'Directives immediately follow the heading they annotate; document-level ones follow the title',
  defaults: {
    documentKeys: ['introduced_in', 'source_link', 'llm_description'],
  },
  /** @param {Options} options */
  run(context, { documentKeys }, file) {
    const title =
      context.entries.find(entry => entry.depth === 1) ?? context.entries[0];

    for (const comment of context.comments) {
      if (comment.kind !== 'directive') {
        continue;
      }

      const { node, key, entry, nested } = comment;

      if (nested) {
        file.message(
          `The \`${key}\` directive must be a top-level comment, not nested in other content`,
          node
        );
        continue;
      }

      if (documentKeys.includes(key) && entry !== title) {
        file.message(
          `The \`${key}\` directive must directly follow the document title, not \`${entry.data.text || 'this heading'}\``,
          node
        );
        continue;
      }

      const blocker = context.blockedBy(entry, node, context.isComment);

      if (blocker) {
        file.message(
          `The \`${key}\` directive must immediately follow its heading, before any content`,
          node
        );
      }
    }
  },
});
