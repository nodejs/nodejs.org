import { defineRule } from '../rule.mjs';

const PREFIX = /^(Returns|Extends|Type):\s*$/;

export default defineRule({
  name: 'no-typed-list-in-prose',
  description:
    'Parameters, return values and types are documented in typed lists, not in prose',
  syntax: true,
  run(context, _, file) {
    for (const { node, nested } of context.paragraphs) {
      if (nested) {
        continue;
      }

      const [first, second, third, fourth] = node.children;

      // Prose may start with `` `code` {Type}s ``; a parameter's description
      // is separated from its type by whitespace
      const describes = node =>
        node === undefined || (node.type === 'text' && /^\s/.test(node.value));

      if (
        first?.type === 'text' &&
        PREFIX.test(first.value) &&
        second?.type === 'typeAnnotation' &&
        describes(third)
      ) {
        file.message(
          `\`${first.value.trim()}\` belongs in a typed list item: \`* ${first.value.trim()} {Type}\``,
          node
        );
      } else if (
        first?.type === 'inlineCode' &&
        second?.type === 'text' &&
        second.value === ' ' &&
        third?.type === 'typeAnnotation' &&
        describes(fourth)
      ) {
        file.message(
          `Document \`${first.value}\` in a typed list item: \`* \`${first.value}\` {Type} description\``,
          node
        );
      }
    }
  },
});
