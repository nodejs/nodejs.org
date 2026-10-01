import { defineRule } from '../rule.mjs';

/**
 * Definitions are ordered by their raw label, case-sensitively (uppercase,
 * then backtick-wrapped code, then lowercase), which is the convention of
 * the Node.js documentation. `remark-lint-definition-sort` orders by
 * lowercased identifiers instead, which would reorder every existing block.
 */
export default defineRule({
  name: 'ordered-definitions',
  description: 'Link reference definitions are sorted by label',
  run(context, _, file) {
    let previous;

    for (const { node } of context.definitions) {
      const label = node.label ?? node.identifier;

      if (previous !== undefined && previous > label) {
        file.message(
          `Unordered definition: \`${label}\` should come before \`${previous}\``,
          node
        );
      }

      previous = label;
    }
  },
});
