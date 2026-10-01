import { defineRule } from '../rule.mjs';
import { getYamlBlocks, isAncientChange, isMapping } from '../utils/yaml.mjs';

/**
 * @typedef Options
 * @property {Array<string>} keys
 *   The keys a change record may carry, in the order they must appear.
 * @property {Array<string>} required
 *   The keys every change record must carry.
 * @property {string | RegExp} prUrl
 *   The pattern a `pr-url` must match.
 * @property {string | RegExp} privatePrUrl
 *   The `pr-url` pattern of security changes, which reference a private pull
 *   request and therefore list the public `commit` too.
 * @property {boolean} ignoreAncient
 *   Whether changes from before Node.js 1.0, which predate pull requests,
 *   are exempt from the required keys and the `pr-url` pattern.
 */

const COMMIT_SHA = /^[0-9a-f]{40}$/i;

export const DEFAULT_PR_URL =
  /^https:\/\/github\.com\/nodejs(?:-private)?\/node(?:-private)?\/pull\/\d+$/;
export const DEFAULT_PRIVATE_PR_URL =
  /^https:\/\/github\.com\/nodejs-private\/node-private\/pull\/\d+$/;

const toRegExp = pattern =>
  pattern instanceof RegExp ? pattern : new RegExp(pattern);

export default defineRule({
  name: 'yaml-changes',
  description:
    '`changes` is a list of records with an ordered `version`, a pull request `pr-url`, a `description` ending with a period, and a full `commit` SHA for security changes',
  defaults: {
    keys: ['version', 'commit', 'pr-url', 'description'],
    required: ['version', 'pr-url', 'description'],
    prUrl: DEFAULT_PR_URL,
    privatePrUrl: DEFAULT_PRIVATE_PR_URL,
    ignoreAncient: true,
  },
  /** @param {Options} options */
  run(context, { keys, required, prUrl, privatePrUrl, ignoreAncient }, file) {
    const prUrlPattern = toRegExp(prUrl);
    const privatePattern = toRegExp(privatePrUrl);

    for (const { node, yaml } of getYamlBlocks(context)) {
      if (!('changes' in yaml)) {
        continue;
      }

      if (!Array.isArray(yaml.changes)) {
        file.message('`changes` must be a list of change records', node);
        continue;
      }

      yaml.changes.forEach((change, index) => {
        const prefix = `changes[${index}]`;

        if (!isMapping(change)) {
          file.message(`${prefix}: each change must be a mapping`, node);
          return;
        }

        const ancient = ignoreAncient && isAncientChange(change);
        const present = Object.keys(change);

        // Keys
        if (!ancient) {
          for (const key of required) {
            if (!(key in change)) {
              file.message(`${prefix}: missing required \`${key}\``, node);
            }
          }
        }

        for (const key of present) {
          if (!keys.includes(key)) {
            file.message(
              `${prefix}: unknown key \`${key}\`; expected: ${required.join(', ')}`,
              node
            );
          }
        }

        const known = present.filter(key => keys.includes(key));
        const sorted = [...known].sort(
          (a, b) => keys.indexOf(a) - keys.indexOf(b)
        );

        if (known.some((key, position) => key !== sorted[position])) {
          file.message(
            `${prefix}: keys must be ordered: ${sorted.join(', ')}`,
            node
          );
        }

        // Pull request
        const url = change['pr-url'];
        const isPrivate = typeof url === 'string' && privatePattern.test(url);

        if (
          url !== undefined &&
          !ancient &&
          (typeof url !== 'string' || !prUrlPattern.test(url))
        ) {
          file.message(
            `${prefix}: \`pr-url\` must be a full pull request URL matching ${prUrlPattern}; saw ${JSON.stringify(url)}`,
            node
          );
        }

        // Description
        const { description } = change;

        if (description !== undefined) {
          if (typeof description !== 'string') {
            file.message(`${prefix}: \`description\` must be a string`, node);
          } else if (!description.trim()) {
            file.message(`${prefix}: \`description\` must not be empty`, node);
          } else if (!description.trim().endsWith('.')) {
            file.message(
              `${prefix}: \`description\` must end with a period`,
              node
            );
          }
        }

        // Commit (security fixes, or pre-1.0 changes without a pull request)
        if ('commit' in change) {
          if (!isPrivate && !isAncientChange(change)) {
            file.message(
              `${prefix}: \`commit\` is only used for security changes referencing a private pull request`,
              node
            );
          }

          if (
            typeof change.commit !== 'string' ||
            !COMMIT_SHA.test(change.commit)
          ) {
            file.message(
              `${prefix}: \`commit\` must be a full 40-character commit SHA`,
              node
            );
          }
        }
      });
    }
  },
});
