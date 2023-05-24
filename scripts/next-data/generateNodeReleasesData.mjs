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
  const nodevuOutput = await nodevu();

  const nodeReleases = new Map();
  Object.values(nodevuOutput)
    .reverse()
    .forEach(major => {
      const latestVersion = Object.values(major.releases)[0];

      // Filter out those without documented support
      // Basically those not in schedule.json
      if (!major.support) return;

      nodeReleases.set(latestVersion.semver.major, {
        major: latestVersion.semver.major,
        version: latestVersion.semver.raw,
        codename: major.support.codename,
        currentStart: major.support.phases?.dates?.start,
        ltsStart: major.support.phases?.dates?.lts,
        maintenanceStart: major.support.phases?.dates?.maintenance,
        endOfLife: major.support.phases?.dates?.end,
        npm: latestVersion.dependencies?.npm,
        v8: latestVersion.dependencies?.v8,
        releaseDate: latestVersion.releaseDate,
        modules: latestVersion.modules?.version,
      });
    });

  return writeFile(
    jsonFilePath,
    JSON.stringify([...nodeReleases.values()].reverse())
  );
};

export default generateNodeReleasesData;
