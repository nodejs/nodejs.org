import { defineRule } from '../rule.mjs';
import { isMapping } from '../utils/yaml.mjs';

export default defineRule({
  name: 'yaml-comment-syntax',
  description:
    'YAML metadata blocks are `<!-- YAML` comments on their own lines holding a valid mapping',
  run(context, _, file) {
    for (const comment of context.comments) {
      if (comment.kind !== 'yaml') {
        continue;
      }

      const { node, padded, yamlSource, yaml, yamlErrors } = comment;

      if (padded !== 1) {
        file.message(
          `Expected \`<!-- YAML\` with exactly one space; saw \`<!--${' '.repeat(padded)}YAML\``,
          node
        );
      }

      if (!/^\r?\n/.test(yamlSource)) {
        file.message(
          'Start the YAML content on the line after `<!-- YAML`',
          node
        );
      }

      if (!/\r?\n[ \t]*$/.test(yamlSource)) {
        file.message('Close the YAML block with `-->` on its own line', node);
      }

      if (yamlErrors.length) {
        file.message(
          `Invalid YAML: ${yamlErrors[0].message.split('\n')[0]}`,
          node
        );
        continue;
      }

      if (!isMapping(yaml)) {
        file.message(
          yaml === null || yaml === undefined
            ? 'The YAML block is empty; remove it or add metadata fields'
            : 'YAML metadata must be a mapping of fields (e.g. `added: v1.0.0`)',
          node
        );
      }
    }
  },
});
