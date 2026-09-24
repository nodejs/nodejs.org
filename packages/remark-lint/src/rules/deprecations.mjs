import { DEPRECATION_HEADING_REGEX } from '@doc-kit/core/generators/metadata/constants.mjs';

import { defineRule } from '../rule.mjs';

/**
 * @typedef Options
 * @property {Array<string>} files
 *   The file stems listing deprecations.
 */

const TYPE_LINE = /^Type: \S/;

const code = number => `DEP${String(number).padStart(4, '0')}`;

export default defineRule({
  name: 'deprecations',
  description:
    'Deprecation entries are sequential, and carry a `Type:` line and a change history',
  defaults: { files: ['deprecations'] },
  /** @param {Options} options */
  run(context, { files }, file) {
    if (!files.includes(file.stem)) {
      return;
    }

    let expected = 1;

    for (const entry of context.entries) {
      const deprecation = DEPRECATION_HEADING_REGEX.exec(entry.data.text)?.[1];

      if (!deprecation) {
        continue;
      }

      // An intentionally skipped code is acknowledged with
      // `<!-- lint ignore deprecations -->` before the next entry: the
      // sequence resumes from whatever code that entry has
      if (deprecation !== code(expected)) {
        file.message(
          `Deprecation codes are out of order: expected \`${code(expected)}\`, saw \`${deprecation}\``,
          entry.heading
        );
      }

      expected = Number(deprecation.slice(3)) + 1;

      // The `Type:` line is the first content after the heading's metadata
      const first = entry.nodes.find(node => !context.infoOf(node));
      const typeLine =
        first?.type === 'paragraph' &&
        first.children[0]?.type === 'text' &&
        TYPE_LINE.test(first.children[0].value);

      if (!typeLine) {
        file.message(
          `Deprecation \`${deprecation}\` must start with a \`Type: ...\` line`,
          entry.heading
        );
      }

      const hasChanges = entry.nodes.some(node => {
        const info = context.infoOf(node);

        return info?.kind === 'yaml' && info.yaml && 'changes' in info.yaml;
      });

      if (!hasChanges) {
        file.message(
          `Deprecation \`${deprecation}\` is missing its YAML \`changes\` history`,
          entry.heading
        );
      }
    }
  },
});
