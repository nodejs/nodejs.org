'use strict';

import getMajorNodeReleases from './majorNodeReleases.mjs';

/**
 * This method is used to generate all Node.js versions
 * for self-consumption during RSC and Static Builds
 *
 * @returns {Promise<Array<string>>}
 */
const generateAllVersionsData = async () => {
  const majors = await getMajorNodeReleases();

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
