import GitHubSlugger from 'github-slugger';

export const getGitHubAvatarUrl = (username: string): string =>
  `https://avatars.githubusercontent.com/${username}`;

export const createGitHubSlugger = () => {
  const githubSlugger = new GitHubSlugger();

  return (text: string) => githubSlugger.slug(text);
};

export const getGitHubBlobUrl = (filename: string) =>
  `https://github.com/nodejs/nodejs.org/blob/main/apps/site/pages/en/${filename}`;
