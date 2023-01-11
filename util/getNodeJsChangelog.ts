import semVer from 'semver';

export const getNodejsChangelog = (version: string) => {
  const changelogs = 'https://github.com/nodejs/node/blob/main/doc/changelogs';

  const clean = semVer.clean(version);

  const major = semVer.major(clean!);
  const minor = semVer.minor(clean!);

  if (major >= 4) {
    return `${changelogs}/CHANGELOG_V${major}.md#${clean}`;
  }

  if (major >= 1) {
    return `${changelogs}/CHANGELOG_IOJS.md#${clean}`;
  }

  if (minor === 12 || minor === 10) {
    return `${changelogs}/CHANGELOG_V${major}${minor}.md#${clean}`;
  }

  return `https://github.com/nodejs/node-v0.x-archive/blob/${version}/ChangeLog`;
};
