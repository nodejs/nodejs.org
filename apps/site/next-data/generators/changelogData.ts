import { fetchNodeJsChangelog } from '@/util/fetchNodeJsChangelog';

/**
 * This method is used to generate the Node.js Changelog Data
 * for self-consumption during RSC and Static Builds
 */
const generateChangelogData = async (version: string): Promise<string> => {
  // Get the raw changelog for the latest minor for a given major
  return fetchNodeJsChangelog(version);
};

export default generateChangelogData;
