import { UNIST } from '@doc-kit/core/utils/queries/index.mjs';

import { defineRule } from '../rule.mjs';

export default defineRule({
  name: 'heading-depth',
  description: 'Headings are at most as deep as doc-kit treats as an entry',
  run(context, _, file) {
    for (const { node } of context.headings) {
      if (!UNIST.isHeading(node)) {
        file.message(
          `Heading depth ${node.depth} is too deep; doc-kit does not treat it as an entry`,
          node
        );
      }
    }
  },
});
