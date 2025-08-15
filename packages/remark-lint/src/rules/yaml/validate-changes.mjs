import orderedYamlKeys from './ordered-yaml-keys.mjs';
import { validateVersion } from './validate-versions.mjs';

const VALID_KEYS = ['version', 'pr-url', 'description'];
const VALID_PR_URL =
  /^https:\/\/github.com\/nodejs(?:-private)?\/node(?:-private)?\/pull\/\d+$/;

const isSecurityRelated = change =>
  typeof change['pr-url'] === 'string' &&
  change['pr-url']?.startsWith(
    'https://github.com/nodejs-private/node-private/pull/'
  );

const isAncient = change =>
  typeof change.version === 'string' && change.version.startsWith('v0.');

export default ({ changes }, report) => {
  if (changes === undefined) {
    return;
  }

  if (!Array.isArray(changes)) {
    return report('"changes" must be an Array');
  }

  changes.forEach((change, index) => {
    // Validate security information, if it exists
    if (isSecurityRelated(change)) {
      if ('commit' in change) {
        if (isNaN(`0x${change.commit}`)) {
          report(`In "changes[${index}]": Invalid commit: "${change.commit}"`);
        }

        // Remove the "commit" key so we can validate keys like normal.
        delete change.commit;
      }
    }

    // Anything below v1.0 is older than this format
    if (!isAncient(change)) {
      // Validate the PR URL
      if (!VALID_PR_URL.test(change['pr-url'])) {
        report(
          `In "changes[${index}]": "${change['pr-url']}" is not a valid PR URL.`
        );
      }

      // Validate the keys
      orderedYamlKeys(change, report, VALID_KEYS, `In "changes[${index}]": `);
    }

    // Validate the versions
    validateVersion(change.version, report, `changes[${index}].version`);

    // Validate the description
    if (change.description.trim().length === 0) {
      report(`In "changes[${index}]": Description cannot be empty`);
    } else if (!change.description.endsWith('.')) {
      report(`In "changes[${index}]": Description must end with a "."`);
    }
  });
};
