import { defineRule } from '../rule.mjs';

export default defineRule({
  name: 'document-description',
  description:
    'The document has a description: an introductory paragraph or an `llm_description` directive',
  run(context, _, file) {
    const title = context.entries.find(entry => entry.depth === 1);

    if (!title) {
      return;
    }

    const hasDirective = context.comments.some(
      comment =>
        comment.kind === 'directive' && comment.key === 'llm_description'
    );
    const hasParagraph = title.nodes.some(node => node.type === 'paragraph');

    if (!hasDirective && !hasParagraph) {
      file.message(
        'Missing document description: add an introductory paragraph or an `<!--llm_description=...-->` directive',
        title.heading
      );
    }
  },
});
