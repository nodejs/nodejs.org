import { defineRule } from '../rule.mjs';
import { getYamlBlocks } from '../utils/yaml.mjs';

/**
 * @typedef Options
 * @property {Array<string>} keys
 *   The allowed fields, in the order they must appear.
 * @property {Array<string>} types
 *   The entry types and contexts a `type` override may name.
 */

const HINTS = {
  introduced_in: 'use the `<!--introduced_in=...-->` directive instead',
  name: 'use the `<!--name=...-->` directive instead',
};

export default defineRule({
  name: 'yaml-fields',
  description:
    'YAML metadata uses defined fields in a consistent order, with well-typed values',
  defaults: {
    keys: [
      'added',
      'napiVersion',
      'deprecated',
      'removed',
      'changes',
      'type',
      'source_link',
      'llm_description',
    ],
    types: [
      'event',
      'method',
      'property',
      'class',
      'classMethod',
      'ctor',
      'module',
      'global',
      'misc',
    ],
  },
  /** @param {Options} options */
  run(context, { keys, types }, file) {
    for (const { node, yaml } of getYamlBlocks(context)) {
      const present = Object.keys(yaml);
      let last = -1;
      let unordered = false;

      for (const key of present) {
        const index = keys.indexOf(key);

        if (index === -1) {
          const hint = HINTS[key] ? `; ${HINTS[key]}` : '';

          file.message(
            `Unknown YAML field \`${key}\`${hint}; expected one of: ${keys.join(', ')}`,
            node
          );
          continue;
        }

        unordered ||= index < last;
        last = Math.max(last, index);
      }

      if (unordered) {
        file.message(
          `YAML fields must be ordered: ${keys.filter(key => present.includes(key)).join(', ')}`,
          node
        );
      }

      if ('type' in yaml && !types.includes(yaml.type)) {
        file.message(
          `Unknown \`type\` ${JSON.stringify(yaml.type)}; expected one of: ${types.join(', ')}`,
          node
        );
      }

      if (
        'napiVersion' in yaml &&
        (!Number.isInteger(yaml.napiVersion) || yaml.napiVersion < 1)
      ) {
        file.message(
          `\`napiVersion\` must be a positive integer; saw ${JSON.stringify(yaml.napiVersion)}`,
          node
        );
      }
    }
  },
});
