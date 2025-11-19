'use strict';

import getMajorNodeReleases from './majorNodeReleases.mjs';

// Gets the appropriate release status for each major release
const getNodeReleaseStatus = (now, support) => {
  const { endOfLife, maintenanceStart, ltsStart, currentStart } = support;

  if (endOfLife && now >= new Date(endOfLife)) {
    return 'End-of-life';
  }

  if (maintenanceStart && now >= new Date(maintenanceStart)) {
    return 'Maintenance LTS';
  }

  if (ltsStart && now >= new Date(ltsStart)) {
    return 'Active LTS';
  }

  if (currentStart && now >= new Date(currentStart)) {
    return 'Current';
  }

  return 'Pending';
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
    const [latestVersion] = Object.values(major.releases);

    const support = {
      currentStart: major.support.phases.dates.start,
      ltsStart: major.support.phases.dates.lts,
      maintenanceStart: major.support.phases.dates.maintenance,
      endOfLife: major.support.phases.dates.end,
    };

    // Get the major release status based on our Release Schedule
    const status = getNodeReleaseStatus(new Date(), support);

    const minorVersions = Object.entries(major.releases).map(([, release]) => ({
      modules: release.modules.version || '',
      npm: release.dependencies.npm || '',
      releaseDate: release.releaseDate,
      v8: release.dependencies.v8,
      version: release.semver.raw,
      versionWithPrefix: `v${release.semver.raw}`,
    }));

    return {
      ...support,
      status,
      major: latestVersion.semver.major,
      version: latestVersion.semver.raw,
      versionWithPrefix: `v${latestVersion.semver.raw}`,
      codename: major.support.codename || '',
      isLts: status.endsWith('LTS'),
      npm: latestVersion.dependencies.npm || '',
      v8: latestVersion.dependencies.v8,
      releaseDate: latestVersion.releaseDate,
      modules: latestVersion.modules.version || '',
      minorVersions,
    };
  });
};

export default generateReleaseData;
