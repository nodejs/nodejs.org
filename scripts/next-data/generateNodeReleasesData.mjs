import nodevu from '@nodevu/core';
import { writeFile } from 'fs/promises';
import { join } from 'path';

import { getRelativePath } from './_helpers.mjs';

const generateNodeReleasesData = async () => {
  const nodevuOutput = await nodevu();

  // Filter out those without documented support
  // Basically those not in schedule.json
  const majors = Object.values(nodevuOutput).filter(major => {
    return major?.support;
  });

  const nodeReleases = majors.map(major => {
    const latestVersion = Object.values(major.releases)[0];

    return {
      major: latestVersion.semver.major,
      version: latestVersion.semver.raw,
      codename: major.support.codename,
      currentStart: major.support.phases?.dates?.start,
      ltsStart: major.support.phases?.dates?.lts,
      maintenanceStart: major.support.phases?.dates?.maintenance,
      endOfLife: major.support.phases?.dates?.end,
    };
  });

  const __dirname = getRelativePath(import.meta.url);
  const path = join(__dirname, '../../public/static/node-releases-data.json');

  return writeFile(path, JSON.stringify(nodeReleases));
};

export default generateNodeReleasesData;
