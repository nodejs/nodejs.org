export const githubProfileAvatarUrl = (username: string): string =>
  `https://avatars.githubusercontent.com/${username}`;

export const getAcronymFromString = (str: string): string =>
  str || str.length > 0
    ? // Typescript doesn't like the match function, so we have to ignore it because we use ternary operator to check if str is empty
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      str
        .trim()
        .match(/\b(\w)/g)
        .join('')
        .toLocaleUpperCase()
    : // if str is empty, return NA for Not Available
      'NA';
