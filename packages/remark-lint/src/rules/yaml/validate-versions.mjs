import { valid, parse, gt } from 'semver';

const MAX_SAFE_SEMVER = parse(
  `${Number.MAX_SAFE_INTEGER}.${Number.MAX_SAFE_INTEGER}.${Number.MAX_SAFE_INTEGER}`
);
const VERSION_KEYS = ['added', 'removed', 'deprecated'];

/**
 * Checks if a version is a placeholder that should be ignored in validation
 * @param {string} version - The version string to check
 * @param {number} totalVersions - Total number of versions in the array
 */
const isPlaceholder = (version, totalVersions) =>
  version === 'REPLACEME' && totalVersions === 1;

/**
 * Checks if a version should be ignored in validation (e.g., very old versions)
 * @param {string} version - The version string to check
 */
const isIgnoredVersion = version => {
  const parsed = parse(version);
  return parsed?.major === 0 && parsed.minor < 2;
};

/**
 * Determines if a version string is valid according to project rules
 * @param {string} version - The version string to validate
 * @param {number} totalVersions - Total number of versions in the array
 * @param {Array<string>} releasedVersions - The released versions
 */
const isValidVersion = (version, totalVersions, releasedVersions) => {
  // Special cases that bypass normal validation
  if (isPlaceholder(version, totalVersions) || isIgnoredVersion(version)) {
    return true;
  }

  // Check against known released versions if available
  if (releasedVersions.length > 0) {
    return releasedVersions.includes(version.replace(/^v/, ''));
  }

  // Fall back to semver validation
  return Boolean(valid(version));
};

/**
 * Converts a version string to a comparable object
 * @param {string} version - The version string to convert
 */
const getComparableVersion = version =>
  version === 'REPLACEME' ? MAX_SAFE_SEMVER : parse(version);

/**
 * Validates a single version field in the YAML
 * @type {import('./index.mjs').YAMLRule}
 * @param {string} key
 */
export const validateVersion = (
  input,
  report,
  { releasedVersions = [] },
  key
) => {
  const versions = Array.isArray(input) ? input : [input];
  const totalVersions = versions.length;

  // Validate each version individually
  versions.forEach(version => {
    if (!isValidVersion(version, totalVersions, releasedVersions)) {
      report(`In "${key}": ${version} is invalid`);
    }
  });

  // Check if versions are sorted in descending order
  for (let i = 1; i < totalVersions; i++) {
    const prev = getComparableVersion(versions[i - 1]);
    const curr = getComparableVersion(versions[i]);

    if (gt(curr, prev)) {
      report(
        `In "${key}": Versions are unsorted (should be in descending order)`
      );
      break;
    }
  }
};

/**
 * Validates version fields in a YAML document
 * @type {import('./index.mjs').YAMLRule}
 */
const validateVersions = (yaml, report, options) => {
  VERSION_KEYS.forEach(key => {
    if (yaml[key]) {
      validateVersion(yaml[key], report, options, key);
    }
  });
};

export default validateVersions;
