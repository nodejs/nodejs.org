import { valid, parse, gt } from 'semver';

const NODE_RELEASED_VERSIONS =
  process.env.NODE_RELEASED_VERSIONS?.split(',') ?? [];
const MAX_SAFE_SEMVER = parse(
  `${Number.MAX_SAFE_INTEGER}.${Number.MAX_SAFE_INTEGER}.${Number.MAX_SAFE_INTEGER}`
);

const isReplaceMe = (version, length) =>
  version === 'REPLACEME' && length === 1;

const isIgnoredVersion = version => {
  const parsed = parse(version);
  return parsed?.major === 0 && parsed.minor < 2;
};

const isKnownValid = (version, length) => {
  if (isReplaceMe(version, length) || isIgnoredVersion(version)) {
    return true;
  }

  if (NODE_RELEASED_VERSIONS.length > 0) {
    return NODE_RELEASED_VERSIONS.includes(version.replace(/^v/, ''));
  }

  return Boolean(valid(version));
};

const getComparableVersion = version =>
  version === 'REPLACEME' ? MAX_SAFE_SEMVER : parse(version);

export const validateVersion = (input, report, key) => {
  const versions = Array.isArray(input) ? input : [input];
  const length = versions.length;

  // Report invalid versions
  versions.forEach(version => {
    if (!isKnownValid(version, length)) {
      report(`In "${key}": ${version} is invalid`);
    }
  });

  // Report if versions are not sorted
  for (let i = 1; i < length; i++) {
    const prev = getComparableVersion(versions[i - 1]);
    const curr = getComparableVersion(versions[i]);

    if (gt(curr, prev)) {
      report(`In "${key}": Versions are unsorted`);
      break;
    }
  }
};

export default (yaml, report) => {
  for (const key of ['added', 'removed', 'deprecated']) {
    if (yaml[key]) {
      validateVersion(yaml[key], report, key);
    }
  }
};
