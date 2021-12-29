'use strict';

const semver = require('semver');

module.exports = (version) => {
  if (!semver.valid(version)) return '';

  const changelogs =
    'https://github.com/nodejs/node/blob/master/doc/changelogs';
  const clean = semver.clean(version);
  const major = semver.major(clean);
  const minor = semver.minor(clean);

  if (major >= 4) return `${changelogs}/CHANGELOG_V${major}.md#${clean}`;
  if (major >= 1) return `${changelogs}/CHANGELOG_IOJS.md#${clean}`;
  if (minor === 12 || minor === 10) {
    return `${changelogs}/CHANGELOG_V${major}${minor}.md#${clean}`;
  }

  return `https://github.com/nodejs/node-v0.x-archive/blob/${version}/ChangeLog`;
};
