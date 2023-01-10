import semVer from 'semver';

export const getMajorVersion = (version: string) =>
  `v${semVer.major(version)}.x`;
