import { defineRule } from '../rule.mjs';

/**
 * @typedef Options
 * @property {Array<string>} keys
 *   The defined attribute keys.
 * @property {boolean} allowUnknown
 *   Whether attributes beyond `keys` are allowed (implementations may
 *   support additional attributes).
 */

const ATTRIBUTE = /([A-Za-z_][\w-]*)="([^"]*)"/g;
const ATTRIBUTES =
  /^(?:[A-Za-z_][\w-]*="[^"]*")(?:\s+[A-Za-z_][\w-]*="[^"]*")*$/;

export default defineRule({
  name: 'fenced-code-meta',
  description:
    'Code block attributes after the language use `key="value"` syntax',
  defaults: { keys: ['displayName'], allowUnknown: true },
  /** @param {Options} options */
  run(context, { keys, allowUnknown }, file) {
    for (const { node } of context.codes) {
      const meta = node.meta?.trim();

      if (!meta) {
        continue;
      }

      if (!ATTRIBUTES.test(meta)) {
        file.message(
          'Code block attributes take the form `key="value"` (e.g. `displayName="Reading a file"`)',
          node
        );
        continue;
      }

      if (!allowUnknown) {
        for (const [, key] of meta.matchAll(ATTRIBUTE)) {
          if (!keys.includes(key)) {
            file.message(
              `Unknown code block attribute \`${key}\`; expected one of: ${keys.join(', ')}`,
              node
            );
          }
        }
      }
    }
  },
});
