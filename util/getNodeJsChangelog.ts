import semVer from 'semver';

/**
 * Returns the URL of the Node.js changelog for the specified version.
 *
 * @param version The version of Node.js to get the changelog for.
 * @returns The URL of the Node.js changelog for the specified version.
 */
export const getNodejsChangelog = (version: string): string => {
  const changelogsUrl =
    'https://github.com/nodejs/node/blob/main/doc/changelogs';

  // Parse the version string and get the major and minor versions
  const cleanVersion = semVer.clean(version) as string;
  const majorVersion = semVer.major(cleanVersion);
  const minorVersion = semVer.minor(cleanVersion);

  // Determine the URL of the changelog based on the version
  if (majorVersion >= 4) {
    return `${changelogsUrl}/CHANGELOG_V${majorVersion}.md#${cleanVersion}`;
  }

  if (majorVersion >= 1) {
    return `${changelogsUrl}/CHANGELOG_IOJS.md#${cleanVersion}`;
  }

  if (minorVersion === 12 || minorVersion === 10) {
    return `${changelogsUrl}/CHANGELOG_V${majorVersion}${minorVersion}.md#${cleanVersion}`;
  }

  return `https://github.com/nodejs/node-v0.x-archive/blob/${version}/ChangeLog`;
};
