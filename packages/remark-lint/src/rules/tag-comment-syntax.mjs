import {
  extractYamlContent,
  parseYAMLIntoMetadata,
} from '@doc-kit/core/generators/metadata/utils/yaml.mjs';
import { UNIST } from '@doc-kit/core/utils/queries/index.mjs';
import { parse } from 'yaml';

import { defineRule } from '../rule.mjs';

// The fields doc-kit reads from metadata; a comment that parses as a mapping
// of anything else (`<!-- TODO: fix this -->`) is harmless prose
const METADATA_FIELDS = new Set([
  'added',
  'napiVersion',
  'deprecated',
  'removed',
  'changes',
  'type',
  'name',
  'introduced_in',
  'source_link',
  'llm_description',
  'module',
]);

/**
 * @param {unknown} value
 */
const definesMetadata = value =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.keys(value).some(key => METADATA_FIELDS.has(key));

/**
 * @param {object} value
 */
const describeKeys = value =>
  Array.isArray(value)
    ? 'a list'
    : `the key(s) ${Object.keys(value)
        .map(key => `\`${key}\``)
        .join(', ')}`;

export default defineRule({
  name: 'tag-comment-syntax',
  description:
    'Plain comments do not accidentally define (or fail to declare) YAML metadata',
  run(context, _, file) {
    for (const { node, kind, inner } of context.comments) {
      if (kind !== 'tag') {
        continue;
      }

      // doc-kit only reads single-line comments (and `<!-- YAML` blocks)
      if (!UNIST.isYamlNode(node)) {
        let parsed;

        try {
          parsed = parse(inner, { version: '1.2' });
        } catch {
          continue;
        }

        if (definesMetadata(parsed)) {
          file.message(
            `This comment looks like YAML metadata (${describeKeys(parsed)}) but lacks the \`YAML\` keyword, so doc-kit ignores it; start it with \`<!-- YAML\``,
            node
          );
        }

        continue;
      }

      // Exactly what doc-kit does with the comment
      let metadata;

      try {
        metadata = parseYAMLIntoMetadata(extractYamlContent(node));
      } catch (error) {
        file.message(
          `Comment is not valid YAML, which doc-kit cannot parse: ${error.message.split('\n')[0]}`,
          node
        );
        continue;
      }

      if (metadata === null || metadata === undefined) {
        file.message(
          "Empty comments break doc-kit's metadata parsing; remove this comment or give it content",
          node
        );
      } else if (definesMetadata(metadata)) {
        file.message(
          `Plain comments must be simple text; doc-kit parses this one as YAML metadata with ${describeKeys(metadata)}`,
          node
        );
      }
    }
  },
});
