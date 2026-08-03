import GitHubSlugger from 'github-slugger';

export const getGitHubAvatarUrl = (
  id: string | number,
  useLegacyUrl?: boolean
): string =>
  useLegacyUrl
    ? `https://avatars.githubusercontent.com/${id}` // this is not guaranteed to work for all users, as they may change their username
    : `https://avatars.githubusercontent.com/u/${id}`;

export const createGitHubSlugger = () => {
  const githubSlugger = new GitHubSlugger();

  return (text: string) => githubSlugger.slug(text);
};

export const getGitHubBlobUrl = (filename: string) =>
  `https://github.com/nodejs/nodejs.org/blob/main/apps/site/pages/en/${filename}`;
