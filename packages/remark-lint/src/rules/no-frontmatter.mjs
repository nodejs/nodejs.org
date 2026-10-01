import { QUERIES } from '@doc-kit/core/utils/queries/index.mjs';

import { defineRule } from '../rule.mjs';

export default defineRule({
  name: 'no-frontmatter',
  description: 'Metadata uses `<!-- YAML -->` comments rather than frontmatter',
  run(context, _, file) {
    if (QUERIES.standardYamlFrontmatter.test(String(file.value))) {
      file.message(
        'Use a `<!-- YAML ... -->` comment instead of `---` frontmatter',
        { line: 1, column: 1 }
      );
    }
  },
});
