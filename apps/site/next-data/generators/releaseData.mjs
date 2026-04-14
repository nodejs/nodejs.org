'use strict';

import getMajorNodeReleases from './majorNodeReleases.mjs';

// Gets the appropriate release status for each major release
const getNodeReleaseStatus = (latest, eol) => {
  const now = new Date();

  if (eol && now >= new Date(eol)) {
    return 'End-of-life';
  }

  if (latest.lts.isLts) {
    return 'LTS';
  }

  return 'Current';
};

/**
 * This method is used to generate the Node.js Release Data
 * for self-consumption during RSC and Static Builds
 *
 * @returns {Promise<Array<import('../../types').NodeRelease>>}
 */
const generateReleaseData = async () => {
  const majors = await getMajorNodeReleases();

  return majors.map(([, major]) => {
    const versions = Object.values(major.releases);
    const latestVersion = versions[0];
    const initialVersion = versions[versions.length - 1];

    // Get the major release status based on our Release Schedule
    const status = getNodeReleaseStatus(
      latestVersion,
      major.support.phases.dates.end
    );

    const minorVersions = Object.entries(major.releases).map(([, release]) => ({
      modules: release.modules.version || '',
      npm: release.dependencies.npm || '',
      releaseDate: release.releaseDate,
      v8: release.dependencies.v8,
      version: release.semver.raw,
      versionWithPrefix: `v${release.semver.raw}`,
    }));

    return {
      status,
      major: latestVersion.semver.major,
      version: latestVersion.semver.raw,
      versionWithPrefix: `v${latestVersion.semver.raw}`,
      codename: major.support.codename || '',
      npm: latestVersion.dependencies.npm || '',
      v8: latestVersion.dependencies.v8,
      releaseDate: latestVersion.releaseDate,
      initialDate: initialVersion.releaseDate,
      modules: latestVersion.modules.version || '',
      minorVersions,
    };
  });
};

export default generateReleaseData;
