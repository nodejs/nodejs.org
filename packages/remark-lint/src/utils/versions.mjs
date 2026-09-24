import { parse, valid, gt } from 'semver';

// Spec §6.4: `v<MAJOR>.<MINOR>.<PATCH>` with a lowercase `v`
export const VERSION_STRING = /^v\d+\.\d+\.\d+$/;

// Placeholders used for unreleased features (spec §6.4 allows sentinels)
export const DEFAULT_PLACEHOLDERS = ['REPLACEME'];

const MAX_SAFE_SEMVER = parse(
  Array.from({ length: 3 }, () => Number.MAX_SAFE_INTEGER).join('.')
);

/**
 * Normalizes a released-versions list so both `18.0.0` and `v18.0.0` forms
 * are accepted, as a `Set` for O(1) lookups.
 *
 * @param {Array<string> | string | undefined} releasedVersions
 */
export const normalizeReleasedVersions = releasedVersions => {
  if (!releasedVersions) {
    return undefined;
  }

  const list = Array.isArray(releasedVersions)
    ? releasedVersions
    : String(releasedVersions).split(',');

  return new Set(list.map(version => version.trim().replace(/^v/, '')));
};

/**
 * Whether a version is too old to be validated against the release list
 * (Node.js 0.0.x and 0.1.x predate the changelogs).
 *
 * @param {string} version
 */
const isAncient = version => {
  const parsed = parse(version);

  return parsed?.major === 0 && parsed.minor < 2;
};

/**
 * Validates one version string.
 *
 * @param {unknown} version
 * @param {{ placeholders: Array<string>, releasedVersions?: Set<string> }} options
 * @returns {string | undefined} A problem description, if any
 */
export const checkVersion = (version, { placeholders, releasedVersions }) => {
  if (typeof version !== 'string') {
    return `expected a version string, got ${JSON.stringify(version)}`;
  }

  if (placeholders.includes(version)) {
    return undefined;
  }

  if (!VERSION_STRING.test(version) || !valid(version)) {
    const hint = placeholders.length
      ? ` (or ${placeholders.map(p => `\`${p}\``).join(', ')})`
      : '';

    return `"${version}" is not a valid version; expected \`vX.Y.Z\`${hint}`;
  }

  if (
    releasedVersions &&
    !isAncient(version) &&
    !releasedVersions.has(version.slice(1))
  ) {
    return `"${version}" is not a released version`;
  }

  return undefined;
};

/**
 * Comparable form of a version; placeholders sort after everything.
 *
 * @param {string} version
 * @param {Array<string>} placeholders
 */
const comparable = (version, placeholders) =>
  placeholders.includes(version) ? MAX_SAFE_SEMVER : parse(version);

/**
 * Whether a list of versions is sorted in descending order. Invalid entries
 * are skipped, as they are reported separately.
 *
 * @param {Array<unknown>} versions
 * @param {Array<string>} placeholders
 */
export const isDescending = (versions, placeholders) => {
  let previous;

  for (const version of versions) {
    const current =
      typeof version === 'string' ? comparable(version, placeholders) : null;

    if (!current) {
      continue;
    }

    if (previous && gt(current, previous)) {
      return false;
    }

    previous = current;
  }

  return true;
};
