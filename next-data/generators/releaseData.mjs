'use strict';

import nodevu from '@nodevu/core';

// Gets the appropriate release status for each major release
const getNodeReleaseStatus = (now, support) => {
  const { endOfLife, maintenanceStart, ltsStart, currentStart } = support;

  if (endOfLife && now > new Date(endOfLife)) {
    return 'End-of-life';
  }

  if (maintenanceStart && now > new Date(maintenanceStart)) {
    return 'Maintenance LTS';
  }

  if (ltsStart && now > new Date(ltsStart)) {
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
const generateReleaseData = () => {
  return nodevu({ fetch: fetch }).then(nodevuOutput => {
    // Filter out those without documented support
    // Basically those not in schedule.json
    const majors = Object.values(nodevuOutput).filter(major => !!major.support);

    const nodeReleases = majors.map(major => {
      const [latestVersion] = Object.values(major.releases);

      const support = {
        currentStart: major.support.phases.dates.start,
        ltsStart: major.support.phases.dates.lts,
        maintenanceStart: major.support.phases.dates.maintenance,
        endOfLife: major.support.phases.dates.end,
      };

      const status = getNodeReleaseStatus(new Date(), support);

      return {
        ...support,
        status,
        major: latestVersion.semver.major,
        version: latestVersion.semver.raw,
        versionWithPrefix: `v${latestVersion.semver.raw}`,
        codename: major.support.codename || '',
        isLts: status === 'Active LTS' || status === 'Maintenance LTS',
        npm: latestVersion.dependencies.npm || '',
        v8: latestVersion.dependencies.v8 || '',
        releaseDate: latestVersion.releaseDate || '',
        modules: latestVersion.modules.version || '',
      };
    });

    // nodevu returns duplicated v0.x versions (v0.12, v0.10, ...).
    // This behavior seems intentional as the case is hardcoded in nodevu,
    // see https://github.com/cutenode/nodevu/blob/0c8538c70195fb7181e0a4d1eeb6a28e8ed95698/core/index.js#L24.
    // This line ignores those duplicated versions and takes the latest
    // v0.x version (v0.12.18). It is also consistent with the legacy
    // nodejs.org implementation.
    return nodeReleases.filter(r => r.major !== 0 || r.version === '0.12.18');
  });
};

export default generateReleaseData;
