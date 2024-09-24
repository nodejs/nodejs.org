'use strict';

import { fetchNodeJsChangelog } from '@/util/fetchNodeJsChangelog';

/**
 * This method is used to generate the Node.js Changelog Data
 * for self-consumption during RSC and Static Builds
 *
 * @returns {Promise<string>}
 */
const generateChangelogData = async version => {
  // Get the raw changelog for the latest minor for a given major
  const changelog = await fetchNodeJsChangelog(version);

  return changelog;
};

export default generateChangelogData;
