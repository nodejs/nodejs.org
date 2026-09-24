import { defineRule } from '../rule.mjs';
import {
  DEFAULT_PLACEHOLDERS,
  checkVersion,
  normalizeReleasedVersions,
} from '../utils/versions.mjs';

/**
 * @typedef Options
 * @property {Array<string>} keys
 *   The recognized directive keys.
 * @property {Array<string>} types
 *   Recognized document types, plus the entry types a
 *   section-level `type` directive may override to.
 * @property {Array<string>} placeholders
 *   Version placeholders accepted in `introduced_in`.
 * @property {Array<string> | string} [releasedVersions]
 *   When given, versions must be in this list.
 */

const RELATIVE_PATH = /^(?!\/|[a-z]+:)[^\s]+$/i;
const TOKEN = /^\S+$/;

export default defineRule({
  name: 'directive-value',
  description: 'Directives use a defined key and a well-formed value',
  defaults: {
    keys: [
      'introduced_in',
      'type',
      'source_link',
      'llm_description',
      'name',
      'module',
    ],
    types: [
      'module',
      'misc',
      'global',
      'event',
      'method',
      'property',
      'class',
      'classMethod',
      'ctor',
    ],
    placeholders: DEFAULT_PLACEHOLDERS,
    releasedVersions: undefined,
  },
  /** @param {Options} options */
  run(context, { keys, types, placeholders, releasedVersions }, file) {
    const released = normalizeReleasedVersions(releasedVersions);

    for (const { node, kind, key, value } of context.comments) {
      if (kind !== 'directive') {
        continue;
      }

      if (!keys.includes(key)) {
        file.message(
          `Unknown directive \`${key}\`; expected one of: ${keys.join(', ')}`,
          node
        );
        continue;
      }

      const trimmed = value.trim();

      switch (key) {
        case 'introduced_in': {
          const problem = checkVersion(trimmed, {
            placeholders,
            releasedVersions: released,
          });

          if (problem) {
            file.message(`Invalid \`introduced_in\`: ${problem}`, node);
          }

          break;
        }

        case 'type': {
          if (!types.includes(trimmed)) {
            file.message(
              `Unknown document type \`${trimmed}\`; expected one of: ${types.join(', ')}`,
              node
            );
          }

          break;
        }

        case 'source_link': {
          if (!RELATIVE_PATH.test(trimmed)) {
            file.message(
              '`source_link` must be a relative file path (e.g. `lib/fs.js`)',
              node
            );
          }

          break;
        }

        case 'module': {
          if (!TOKEN.test(trimmed)) {
            file.message(
              '`module` must be a single module specifier without whitespace',
              node
            );
          }

          break;
        }

        default: {
          if (!trimmed) {
            file.message(`\`${key}\` must not be empty`, node);
          }

          break;
        }
      }
    }
  },
});
