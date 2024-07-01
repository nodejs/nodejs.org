import GitHubSlugger from 'github-slugger';

export const getGitHubAvatarUrl = (username: string): string =>
  `https://avatars.githubusercontent.com/${username}`;

export const createGitHubSlugger = () => {
  const githubSlugger = new GitHubSlugger();

  return (text: string) => githubSlugger.slug(text);
};

export const getGitHubBlobUrl = (filename: string) =>
  `https://github.com/nodejs/nodejs.org/blob/main/pages/en/${filename}`;

export const getGitHubApiDocsUrl = (ref: string) =>
  `https://api.github.com/repos/nodejs/node/contents/doc/api?ref=${ref}`;
