import { IGNORE_STABILITY_STEMS } from '@doc-kit/core/generators/metadata/constants.mjs';

import { defineRule } from '../rule.mjs';

/**
 * @typedef Options
 * @property {'index' | 'full'} compare
 *   Whether an indicator is redundant when it repeats the enclosing entry's
 *   level, or only when it repeats its level and description.
 * @property {Array<string>} ignoreFiles
 *   File stems whose stability blockquotes are definitions, not indicators.
 */

export default defineRule({
  name: 'no-redundant-stability',
  description:
    'Nested entries do not repeat the stability of their enclosing entry',
  defaults: { compare: 'index', ignoreFiles: IGNORE_STABILITY_STEMS },
  /** @param {Options} options */
  run(context, { compare, ignoreFiles }, file) {
    if (ignoreFiles.includes(file.stem)) {
      return;
    }

    /** @type {Map<import('../context.mjs').Entry, object>} */
    const byEntry = new Map();

    for (const info of context.stability) {
      if (info.valid && !byEntry.has(info.entry)) {
        byEntry.set(info.entry, info);
      }
    }

    const key = ({ index, description }) =>
      compare === 'full' ? `${index} ${description}` : index;

    for (const [entry, info] of byEntry) {
      for (let parent = entry.parent; parent; parent = parent.parent) {
        const inherited = byEntry.get(parent);

        if (!inherited) {
          continue;
        }

        if (key(inherited) === key(info)) {
          file.message(
            `Redundant stability indicator: the enclosing entry \`${parent.data.text || 'document'}\` already declares Stability: ${inherited.index}`,
            info.node
          );
        }

        break;
      }
    }
  },
});
