import authors from '@/authors.json';

import { getGitHubAvatarUrl } from './gitHubUtils';
import { getAcronymFromString } from './stringUtils';

export const mapAuthorToCardAuthors = (author: string) =>
  author.split(/, | and |;| & | prepared by | by /i);

export const getAuthorWithId = (usernames: Array<string>) =>
  usernames.map(username => {
    const author = Object.values(authors).find(
      ({ id }: { id: string }) => id.toLowerCase() === username.toLowerCase()
    ) as { id: string; name: string; website?: string };

    if (author) {
      const { id, name, website } = author;

      return {
        image: getGitHubAvatarUrl(id),
        name: name,
        nickname: id,
        fallback: getAcronymFromString(name),
        url: website,
      };
    }

    return {
      image: getGitHubAvatarUrl(username),
      nickname: username,
      fallback: getAcronymFromString(username),
      url: `https://github.com/${username}`,
    };
  });

export const getAuthorWithName = (names: Array<string>) =>
  names.map(name => {
    if (Object.keys(authors).includes(name)) {
      const author = authors[name as keyof typeof authors];

      if (author) {
        const {
          id,
          name,
          website,
        }: { id: string; name: string; website?: string } = author;

        return {
          image: getGitHubAvatarUrl(id),
          name: name,
          nickname: id,
          fallback: getAcronymFromString(name),
          url: website,
        };
      }
    }

    return {
      nickname: name,
      fallback: getAcronymFromString(name),
    };
  });
