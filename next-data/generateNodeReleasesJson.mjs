import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import nodevu from '@nodevu/core';

// this is the destination path for where the JSON file will be written
const jsonFilePath = join(process.cwd(), 'public/node-releases-data.json');

const generateNodeReleasesJson = async () => {
  const nodevuOutput = await nodevu({ fetch: fetch });

  // Filter out those without documented support
  // Basically those not in schedule.json
  const majors = Object.values(nodevuOutput).filter(
    major => major?.support?.phases?.dates?.start
  );

  const nodeReleases = majors.map(major => {
    const [latestVersion] = Object.values(major.releases);

    return {
      major: latestVersion.semver.major,
      version: latestVersion.semver.raw,
      codename: major.support.codename,
      currentStart: major.support.phases.dates.start,
      ltsStart: major.support.phases.dates.lts,
      maintenanceStart: major.support.phases.dates.maintenance,
      endOfLife: major.support.phases.dates.end,
      npm: latestVersion.dependencies.npm,
      v8: latestVersion.dependencies.v8,
      releaseDate: latestVersion.releaseDate,
      modules: latestVersion.modules.version,
    };
  });

  return writeFile(
    jsonFilePath,
    JSON.stringify(
      // nodevu returns duplicated v0.x versions (v0.12, v0.10, ...).
      // This behavior seems intentional as the case is hardcoded in nodevu,
      // see https://github.com/cutenode/nodevu/blob/0c8538c70195fb7181e0a4d1eeb6a28e8ed95698/core/index.js#L24.
      // This line ignores those duplicated versions and takes the latest
      // v0.x version (v0.12.18). It is also consistent with the legacy
      // nodejs.org implementation.
      nodeReleases.filter(
        release => release.major !== 0 || release.version === '0.12.18'
      )
    )
  );
};

export default generateNodeReleasesJson;
