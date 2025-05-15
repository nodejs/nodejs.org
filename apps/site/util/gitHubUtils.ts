export const getGitHubAvatarUrl = (username: string): string =>
  `https://avatars.githubusercontent.com/${username}`;

export const getGitHubBlobUrl = (filename: string) =>
  `https://github.com/nodejs/nodejs.org/blob/main/apps/site/pages/en/${filename}`;

export const getGitHubApiDocsUrl = (ref: string) =>
  `https://api.github.com/repos/nodejs/node/contents/doc/api?ref=${ref}`;
