import { defineRule } from '../rule.mjs';

/**
 * @typedef Options
 * @property {Array<string>} keys
 *   The directives every document must have.
 */

export default defineRule({
  name: 'required-directives',
  description: 'Required document-level directives are present',
  defaults: { keys: ['introduced_in'] },
  /** @param {Options} options */
  run(context, { keys }, file) {
    const present = new Set(
      context.comments
        .filter(comment => comment.kind === 'directive')
        .map(comment => comment.key)
    );
    const title = context.entries.find(entry => entry.depth === 1);

    for (const key of keys) {
      if (!present.has(key)) {
        file.message(
          `Missing \`<!--${key}=...-->\` directive`,
          title?.heading ?? { line: 1, column: 1 }
        );
      }
    }
  },
});
