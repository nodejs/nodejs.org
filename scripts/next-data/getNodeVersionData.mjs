import nodevu from '@nodevu/core';

import { getMatchingRoutes } from './_helpers.mjs';

const getNodeVersionData = () => {
  const nodeVersionData = nodevu().then(majorVersions => {
    const impodentVersions = Object.values(majorVersions);

    const latestNodeVersion = impodentVersions.find(
      major => major.support && major.support.phases.current === 'start'
    );

    const currentLtsVersion = impodentVersions.find(
      major => major.support && major.support.phases.current === 'lts'
    );

    const result = [latestNodeVersion, currentLtsVersion].map(major => {
      const minorReleases = Object.entries(major.releases);

      const [[latestVersion, latestMetadata]] = minorReleases;

      return {
        node: latestVersion,
        nodeNumeric: latestMetadata.semver.raw,
        nodeMajor: `${latestMetadata.semver.line}.x`,
        npm: latestMetadata.dependencies.npm || 'N/A',
        isLts: latestMetadata.lts.isLts,
      };
    });

    return { nodeVersionData: result };
  });

  return (route = '/') => {
    const [, , subDirectory] = route.split('/');

    if (getMatchingRoutes(subDirectory, ['download', '', 'docs'])) {
      // Retuns the cached version of the Node.js versions
      // So that we do not calculate this every single time
      return nodeVersionData;
    }

    return {};
  };
};

export default getNodeVersionData;
