import { defineRule } from '../rule.mjs';

/**
 * @typedef Options
 * @property {Array<string>} levels
 *   The defined stability levels and sub-levels.
 */

const WELL_FORMED = /^Stability: [0-9.]+ - \S/;

export default defineRule({
  name: 'stability-syntax',
  description:
    'Stability indicators take the form `> Stability: <level> - <description>` with a defined level',
  defaults: { levels: ['0', '1', '1.0', '1.1', '1.2', '2', '3'] },
  /** @param {Options} options */
  run(context, { levels }, file) {
    for (const { node, valid, text, index } of context.stability) {
      if (!valid) {
        file.message(
          'Stability indicators take the form `> Stability: <level> - <description>`',
          node
        );
        continue;
      }

      if (!levels.includes(index)) {
        file.message(
          `Unknown stability level \`${index}\`; expected one of: ${levels.join(', ')}`,
          node
        );
      }

      if (!WELL_FORMED.test(text)) {
        file.message(
          'Separate the stability level from its description with ` - `',
          node
        );
      }
    }
  },
});
