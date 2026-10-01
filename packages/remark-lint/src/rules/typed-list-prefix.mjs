import { getItemStarter } from '../context.mjs';
import { defineRule } from '../rule.mjs';
import { getItemParagraph } from '../utils/typed-list.mjs';

// A lowercase spelling doc-kit does not recognize as a prefix
const LOWERCASE_STARTER = /^(returns|extends|type):\s*$/i;

export default defineRule({
  name: 'typed-list-prefix',
  description:
    '`Returns:`, `Extends:` and `Type:` items are spelled exactly and followed by a `{Type}` annotation; `Extends:` comes first, in a class entry',
  syntax: true,
  run(context, _, file) {
    for (const { node: list, typed, entry, nested } of context.lists) {
      list.children.forEach((item, index) => {
        const paragraph = getItemParagraph(item);
        const [first, second] = paragraph?.children ?? [];

        if (first?.type !== 'text') {
          return;
        }

        const starter = getItemStarter(item);

        if (!starter) {
          if (
            LOWERCASE_STARTER.test(first.value) &&
            second?.type === 'typeAnnotation'
          ) {
            const word = first.value.trim().slice(0, -1);

            file.message(
              `Capitalize the prefix: \`${word[0].toUpperCase()}${word.slice(1).toLowerCase()}:\``,
              first
            );
          }

          return;
        }

        // doc-kit only reads prefixes in a typed list; an ordered step such
        // as `4. Returns the result.` is prose
        if (!typed) {
          return;
        }

        const { word } = starter;

        if (first.value !== `${word}: ` || second?.type !== 'typeAnnotation') {
          const rest = first.value.slice(word.length).trim();
          const hint =
            rest && !rest.startsWith(':')
              ? ` (doc-kit treats any item starting with \`${word}\` as this prefix)`
              : '';

          file.message(
            `\`${word}:\` items take the form \`${word}: {Type} description\`: the colon, one space, then a \`{Type}\` annotation${hint}`,
            item
          );
        }

        if (word !== 'Extends') {
          return;
        }

        if (index > 0) {
          file.message(
            '`Extends:` should be the first item of the typed list',
            item
          );
        }

        if (!nested && entry.data.type !== 'class') {
          file.message(
            "`Extends:` denotes a class's superclass, but this entry is not a `Class:` heading",
            item
          );
        }
      });
    }
  },
});
