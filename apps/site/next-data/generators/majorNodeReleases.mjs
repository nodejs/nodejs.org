'use strict';

import nodevu from '@nodevu/core';

/**
 * Filters Node.js release data to return only major releases with documented support.
 */
export default async function getMajorNodeReleases() {
  const nodevuData = await nodevu({ fetch });

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
