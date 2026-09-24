import { DEFAULT_EXPRESSION } from '@doc-kit/core/utils/signature/constants.mjs';
import { transformNodesToString } from '@doc-kit/core/utils/unist.mjs';

import { defineRule } from '../rule.mjs';
import { getItemParagraph } from '../utils/typed-list.mjs';

const EXPECTED = 'Write defaults as `**Default:** `value``';

// A default written some other way (`Default:`, `**Default**:`, ...)
const LOOSE_DEFAULT = /\*\*Default\b|\bDefault:/;

// A bare literal that belongs in a code span (`0`, `false`, `null`, ...)
const LITERAL =
  /^(?:-?\d[\w.]*|true|false|null|undefined|NaN|Infinity)(?![\w$])/;

export default defineRule({
  name: 'typed-list-default',
  description:
    'Default values are introduced by `**Default:**`, with literal values in a code span',
  syntax: true,
  run(context, _, file) {
    for (const { node: list, typed } of context.lists) {
      if (!typed) {
        continue;
      }

      for (const item of list.children) {
        const paragraph = getItemParagraph(item);

        if (!paragraph) {
          continue;
        }

        const { children } = paragraph;
        const text = transformNodesToString(children);

        // Whether doc-kit extracts a default from this item at all
        if (!DEFAULT_EXPRESSION.test(text)) {
          if (LOOSE_DEFAULT.test(text)) {
            file.message(EXPECTED, item);
          }

          continue;
        }

        const defaults = children.filter(
          node =>
            node.type === 'strong' &&
            /^default:$/i.test(transformNodesToString(node.children))
        );

        if (defaults.length > 1) {
          file.message('Items document at most one default value', item);
        }

        for (const strong of defaults) {
          const next = children[children.indexOf(strong) + 1];

          // Exactly `**Default:**`, followed by whitespace and then the value
          if (
            transformNodesToString(strong.children) !== 'Default:' ||
            next?.type !== 'text' ||
            !/^\s/.test(next.value)
          ) {
            file.message(EXPECTED, strong);
            continue;
          }

          const literal = LITERAL.exec(next.value.trimStart())?.[0];

          if (literal) {
            file.message(
              `Wrap the default value in a code span: \`**Default:** \`${literal}\`\``,
              next
            );
          }
        }
      }
    }
  },
});
