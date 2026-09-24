import { defineRule } from '../rule.mjs';
import {
  DEFAULT_PLACEHOLDERS,
  checkVersion,
  isDescending,
  normalizeReleasedVersions,
} from '../utils/versions.mjs';
import { getChanges, getYamlBlocks } from '../utils/yaml.mjs';

/**
 * @typedef Options
 * @property {Array<string>} fields
 *   The fields holding a version or an array of versions.
 * @property {Array<string>} placeholders
 *   Accepted placeholders for unreleased versions.
 * @property {Array<string> | string} [releasedVersions]
 *   When given, versions must be in this list.
 * @property {'descending' | 'ascending' | 'any'} changes
 *   The required order of `changes` records, by their newest version.
 */

export default defineRule({
  name: 'yaml-versions',
  description:
    'Version fields hold `vX.Y.Z` strings (or descending arrays of them), optionally checked against released versions; `changes` are ordered by version',
  defaults: {
    fields: ['added', 'deprecated', 'removed'],
    placeholders: DEFAULT_PLACEHOLDERS,
    releasedVersions: undefined,
    changes: 'descending',
  },
  /** @param {Options} options */
  run(
    context,
    { fields, placeholders, releasedVersions, changes: order },
    file
  ) {
    const options = {
      placeholders,
      releasedVersions: normalizeReleasedVersions(releasedVersions),
    };

    /**
     * @param {import('mdast').Html} node
     * @param {string} label
     * @param {unknown} value
     */
    const check = (node, label, value) => {
      if (Array.isArray(value) && value.length === 0) {
        file.message(`\`${label}\` must not be an empty list`, node);
        return;
      }

      for (const version of Array.isArray(value) ? value : [value]) {
        const problem = checkVersion(version, options);

        if (problem) {
          file.message(`\`${label}\`: ${problem}`, node);
        }
      }

      if (Array.isArray(value) && !isDescending(value, placeholders)) {
        file.message(
          `\`${label}\` must list versions in descending order (newest first)`,
          node
        );
      }
    };

    for (const { node, yaml } of getYamlBlocks(context)) {
      for (const field of fields) {
        if (field in yaml) {
          check(node, field, yaml[field]);
        }
      }

      const changes = getChanges(yaml);

      for (const [index, change] of changes) {
        if ('version' in change) {
          check(node, `changes[${index}].version`, change.version);
        }
      }

      if (order === 'any' || changes.length < 2) {
        continue;
      }

      const newest = changes.map(([, change]) =>
        Array.isArray(change.version) ? change.version[0] : change.version
      );
      const ordered = isDescending(
        order === 'descending' ? newest : [...newest].reverse(),
        placeholders
      );

      if (!ordered) {
        file.message(
          `\`changes\` must be ordered from ${order === 'descending' ? 'newest to oldest' : 'oldest to newest'} version`,
          node
        );
      }
    }
  },
});
