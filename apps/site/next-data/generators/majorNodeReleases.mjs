'use strict';

import nodevu from '@nodevu/core';
import semVer from 'semver';

import { fetchWithRetry } from '#site/next.fetch.mjs';

const toNodevuRelease = ({ version, date, npm, v8, modules, lts }) => {
  const { version: raw, major, minor, patch } = semVer.parse(version);

  return {
    semver: { raw, major, minor, patch, line: `v${major}` },
    releaseDate: date,
    modules: { version: modules },
    dependencies: { npm, v8 },
    lts: { isLts: !!lts },
  };
};

/**
 * Filters Node.js release data to return only major releases with documented support.
 */
export default async function getMajorNodeReleases() {
  const preReleases = [];
  let schedule = {};

  // nodevu coerces versions (v27.0.0-alpha.0.0.0 becomes v27.0.0), hence
  // pre-releases are removed before nodevu parses index.json and added back
  const fetchWithoutPreReleases = async (url, options) => {
    const data = await fetchWithRetry(url, options).then(r => r.json());

    if (!Array.isArray(data)) {
      schedule = data;

      return Response.json(data);
    }

    preReleases.push(
      ...data.filter(({ version }) => semVer.prerelease(version))
    );

    return Response.json(data.filter(r => !preReleases.includes(r)));
  };

  const releaseLines = await nodevu({ fetch: fetchWithoutPreReleases });

  const preReleaseLines = {};

  preReleases.forEach(release => {
    const line = `v${semVer.major(release.version)}`;

    if (!releaseLines[line] && !preReleaseLines[line]) {
      const { codename, ...dates } = schedule[line] ?? {};

      preReleaseLines[line] = {
        releases: {},
        support: schedule[line] && { codename, phases: { dates } },
      };
    }

    const { releases } = releaseLines[line] ?? preReleaseLines[line];

    releases[release.version] = toNodevuRelease(release);
  });

  const nodevuData = { ...preReleaseLines, ...releaseLines };

  return Object.entries(nodevuData).filter(([version, { support }]) => {
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
}
