'use strict';

import nodevu from '@nodevu/core';
import { glob } from 'glob';

// Gets the appropriate release status for each major release
const getNodeReleaseStatus = (now, support) => {
  const { endOfLife, maintenanceStart, ltsStart, currentStart } = support;

  if (endOfLife && now >= new Date(endOfLife)) {
    return 'End-of-life';
  }

  if (maintenanceStart && now >= new Date(maintenanceStart)) {
    return 'Maintenance';
  }

  if (ltsStart && now >= new Date(ltsStart)) {
    return 'LTS';
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
  const releaseAnnouncements = await glob('**/*-release-announce.md', {
    root: process.cwd(),
    cwd: 'pages/en/blog/announcements/',
    absolute: false,
  });

  const nodevuOutput = await nodevu({ fetch: fetch });

  const majors = Object.entries(nodevuOutput).filter(
    ([version, { support }]) => {
      // Filter out those without documented support
      // Basically those not in schedule.json
      if (!support) {
        return false;
      }

      // nodevu returns duplicated v0.x versions (v0.12, v0.10, ...).
      // This behavior seems intentional as the case is hardcoded in nodevu,
      // see https://github.com/cutenode/nodevu/blob/0c8538c70195fb7181e0a4d1eeb6a28e8ed95698/core/index.js#L24.
      // This line ignores those duplicated versions and takes the latest
      // v0.x version (v0.12.18). It is also consistent with the legacy
      // nodejs.org implementation.
      if (version.startsWith('v0.') && version !== 'v0.12') {
        return false;
      }

      return true;
    }
  );

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
      version: release.semver.raw,
      releaseDate: release.releaseDate,
    }));

    const majorVersion = latestVersion.semver.major;

    const releaseAnnounceLink = releaseAnnouncements.includes(
      `v${majorVersion}-release-announce.md`
    )
      ? `/blog/announcements/v${majorVersion}-release-announce`
      : undefined;

    return {
      ...support,
      status,
      major: latestVersion.semver.major,
      version: latestVersion.semver.raw,
      versionWithPrefix: `v${latestVersion.semver.raw}`,
      codename: major.support.codename || '',
      isLts: status === 'LTS',
      npm: latestVersion.dependencies.npm || '',
      v8: latestVersion.dependencies.v8,
      releaseDate: latestVersion.releaseDate,
      modules: latestVersion.modules.version || '',
      releaseAnnounceLink,
      minorVersions,
    };
  });
};

export default generateReleaseData;
