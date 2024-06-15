import { getNodeJsChangelog } from './getNodeJsChangelog';

const getChangelogSectionRegex = (sectionId: string) =>
  new RegExp(`<a id="${sectionId}"></a>\\n([\\s\\S]+?)(?:\\n<a id="|$)`);

export const fetchNodeJsChangelog = async (version: string) => {
  const changeLogUrl = getNodeJsChangelog(version).replace('/blob/', '/');

  // Retrieves the URL part and the Markdown section ID part
  const [url, sectionId] = changeLogUrl.split('#');

  // Creates a Regular Expression for that matches the whole content
  // related to the changelog version that we want to fetch
  const section = getChangelogSectionRegex(sectionId);

  // Replaces the GitHub URL to the RAW source URL so we're able to fetch the data
  const content = fetch(url.replace('github.', 'raw.githubusercontent.'));

  const [, changelogContent] = await content
    .then(res => res.text())
    .then(content => section.exec(content) || []);

  return changelogContent || '';
};
