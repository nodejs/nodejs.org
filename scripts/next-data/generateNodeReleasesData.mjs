import nodevu from '@nodevu/core';
import { writeFile } from 'fs/promises';
import { join } from 'path';

import { getRelativePath } from './_helpers.mjs';

const __dirname = getRelativePath(import.meta.url);
const jsonFilePath = join(
  __dirname,
  '../../public/static/node-releases-data.json'
);

const generateNodeReleasesData = async () => {
  const [nodevuOutput, indexJsonOutput] = await Promise.all([
    nodevu(),
    // nodevu doesn't return release date and modules
    // So it is a temporary workaround
    (await fetch('https://nodejs.org/dist/index.json')).json(),
  ]);

  // Filter out those without documented support
  // Basically those not in schedule.json
  const majors = Object.values(nodevuOutput).filter(major => {
    return major?.support;
  });

  let i = 0;
  const nodeReleases = majors.map(major => {
    const latestVersion = Object.values(major.releases)[0];

    while (
      i < indexJsonOutput.length &&
      indexJsonOutput[i].version !== `v${latestVersion.semver.raw}`
    ) {
      i++;
    }

    return {
      major: latestVersion.semver.major,
      version: latestVersion.semver.raw,
      codename: major.support.codename,
      currentStart: major.support.phases?.dates?.start,
      ltsStart: major.support.phases?.dates?.lts,
      maintenanceStart: major.support.phases?.dates?.maintenance,
      endOfLife: major.support.phases?.dates?.end,
      npm: latestVersion.dependencies?.npm,
      v8: latestVersion.dependencies?.v8,
      releaseDate: indexJsonOutput[i]?.date,
      modules: indexJsonOutput[i]?.modules,
    };
  });

  return writeFile(jsonFilePath, JSON.stringify(nodeReleases));
};

export default generateNodeReleasesData;
