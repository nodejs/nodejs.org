export const githubProfileAvatarUrl = (username: string): string =>
  `https://avatars.githubusercontent.com/${username}`;

export const getAcronymFromString = (str = '') =>
  str.length > 0
    ? [...(str.trim().match(/\b(\w)/g) || '')].join('').toUpperCase()
    : 'NA';
