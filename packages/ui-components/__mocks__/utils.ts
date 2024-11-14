export const getGitHubAvatarUrl = (username: string): string =>
  `https://avatars.githubusercontent.com/${username}`;

const author = {
  id: 'nodejs',
  name: 'nodejs',
  website: 'https://github.com/nodejs',
};

export const authors = {
  withName: {
    image: getGitHubAvatarUrl(author.id),
    nickname: author.id,
    fallback: 'withName.fallback',
    url: author.website,
    name: author.name,
  },
  withoutName: {
    image: getGitHubAvatarUrl(author.id),
    nickname: author.id,
    fallback: 'withoutName.fallback',
    url: author.website,
  },
};
