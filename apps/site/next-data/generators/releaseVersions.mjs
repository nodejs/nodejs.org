'use strict';

import nodevuPromise from './nodevuPromise.mjs';

/**
 * This method is used to generate all Node.js versions
 * for self-consumption during RSC and Static Builds
 *
 * @returns {Promise<Array<string>>}
 */
const generateAllVersionsData = async () => {
  const nodevuData = await nodevuPromise;

  const majors = Object.entries(nodevuData).filter(([version, { support }]) => {
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
  });

  return majors.reduce(
    (allVersions, [, major]) =>
      allVersions.concat(
        Object.entries(major.releases).map(
          ([, release]) => `v${release.semver.raw}`
        )
      ),
    []
  );
};
export default generateAllVersionsData;
