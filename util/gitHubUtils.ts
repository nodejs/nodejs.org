import GitHubSlugger from 'github-slugger';

export const githubProfileAvatarUrl = (username: string): string =>
  `https://avatars.githubusercontent.com/${username}`;

export const createGitHubSlug = () => {
  const githubSlugger = new GitHubSlugger();

  return (text: string) => githubSlugger.slug(text);
};

export const getGitHubEditPageUrl = (filename: string) =>
  `https://github.com/nodejs/nodejs.org/blob/main/pages/en/${filename}`;
