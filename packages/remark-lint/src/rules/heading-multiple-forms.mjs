import { defineRule } from '../rule.mjs';

// Text that only separates code spans (no words)
const SEPARATOR = /^[\s,]*$/;

export default defineRule({
  name: 'heading-multiple-forms',
  description:
    'Multiple forms of an entry in one heading are separated by `, `',
  run(context, _, file) {
    for (const { heading } of context.entries) {
      if (!heading) {
        continue;
      }

      const { children } = heading;
      const codes = children.filter(node => node.type === 'inlineCode');

      if (
        codes.length < 2 ||
        !children.every(
          node =>
            node.type === 'inlineCode' ||
            (node.type === 'text' && SEPARATOR.test(node.value))
        )
      ) {
        continue;
      }

      const separators = children.filter(node => node.type === 'text');

      if (
        separators.length !== codes.length - 1 ||
        separators.some(node => node.value !== ', ')
      ) {
        file.message(
          'Separate the forms of this entry with `, ` (e.g. `-c`, `--check`)',
          heading
        );
      }
    }
  },
});
