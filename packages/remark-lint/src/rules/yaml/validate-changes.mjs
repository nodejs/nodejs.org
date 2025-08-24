import orderedYamlKeys from './ordered-yaml-keys.mjs';
import { validateVersion } from './validate-versions.mjs';

const CHANGE_VALID_KEYS = ['version', 'pr-url', 'description'];
const VALID_PR_URL_RE =
  /^https:\/\/github\.com\/nodejs(?:-private)?\/node(?:-private)?\/pull\/\d+$/;
const PRIVATE_PR_STARTER =
  'https://github.com/nodejs-private/node-private/pull/';
const COMMIT_SHA_RE = /^[0-9a-f]{40}$/i;

/**
 * A change is security-related if it references a PR in the private Node.js repo,
 * with a valid commit.
 * @param {Record<string, unknown>} change
 * @returns {boolean}
 */
const isSecurityRelated = change =>
  typeof change?.['pr-url'] === 'string' &&
  change['pr-url'].startsWith(PRIVATE_PR_STARTER) &&
  typeof change?.['commit'] === 'string';

/**
 * Anything below v1.0 is older than this format.
 * @param {Record<string, unknown>} change
 * @returns {boolean}
 */
const isAncient = change =>
  typeof change?.version === 'string' && change.version.startsWith('v0.');

/**
 * Validate the "changes" array within the YAML object.
 * @type {import('./index.mjs').YAMLRule}
 */
export default function validateChanges({ changes }, report, options) {
  if (changes === undefined) {
    // Nothing to validate
    return;
  }

  if (!Array.isArray(changes)) {
    report('"changes" must be an Array');
    return;
  }

  changes.forEach((change, index) => {
    const prefix = `In "changes[${index}]": `;

    if (!change || typeof change !== 'object' || Array.isArray(change)) {
      report(`${prefix}Item must be an object`);
    }

    // Security-related validations
    if (isSecurityRelated(change)) {
      const commit = change.commit;

      if (!COMMIT_SHA_RE.test(commit)) {
        report(`${prefix}Invalid commit: "${commit}"`);
      }

      // Remove the "commit" key so we can validate keys like normal.
      delete change.commit;
    }

    // For non-ancient entries, validate PR URL, keys, and description presence
    if (!isAncient(change)) {
      const prUrl = change['pr-url'];

      if (!VALID_PR_URL_RE.test(prUrl)) {
        report(`${prefix}"${prUrl}" is not a valid PR URL.`);
      }

      // Key validation
      orderedYamlKeys(change, report, options, CHANGE_VALID_KEYS, prefix);
    }

    // Version validation
    validateVersion(
      change.version,
      report,
      options,
      `changes[${index}].version`
    );

    // Description validation
    if (typeof change.description !== 'string') {
      report(`${prefix}Description must be a string`);
    } else if (change.description.trim().length === 0) {
      report(`${prefix}Description cannot be empty`);
    } else if (!change.description.endsWith('.')) {
      report(`${prefix}Description must end with a "."`);
    }
  });
}
