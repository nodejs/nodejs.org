import authors from '@/authors.json';

import { getGitHubAvatarUrl } from './gitHubUtils';
import { getAcronymFromString } from './stringUtils';

export const mapAuthorToCardAuthors = (author: string) => {
  // Clears text in parentheses
  const cleanedAuthor = author.replace(/\s*\(.*?\)\s*/g, '').trim();

  // Defines the separators such as (",", "and", ";", "&", "prepared by", "by")
  const separators = /,|\band\b|;|&| prepared by | by /i;

  return cleanedAuthor
    .split(separators)
    .map(name => name.trim())
    .filter(Boolean);
};

type Author = {
  id: string;
  name: string;
  website?: string;
};

export const getAuthorWithId = (usernames: Array<string>, hasUrl: boolean) =>
  usernames.map(username => {
    const author = Object.values(authors).find(
      ({ id }: { id: string }) => id.toLowerCase() === username.toLowerCase()
    ) as Author | undefined;

    if (author) {
      const { id, name, website } = author;

      return {
        image: getGitHubAvatarUrl(id),
        name: name,
        nickname: id,
        fallback: getAcronymFromString(name),
        url: hasUrl ? website : undefined,
      };
    }

    return {
      image: getGitHubAvatarUrl(username),
      nickname: username,
      fallback: getAcronymFromString(username),
      url: hasUrl ? `https://github.com/${username}` : undefined,
    };
  });

export const getAuthorWithName = (names: Array<string>, hasUrl: boolean) =>
  names.map(name => {
    if (Object.keys(authors).includes(name)) {
      const author = authors[name as keyof typeof authors];

      if (author) {
        const { id, name, website }: Author = author;

        return {
          image: getGitHubAvatarUrl(id),
          name: name,
          nickname: id,
          fallback: getAcronymFromString(name),
          url: hasUrl ? website : undefined,
        };
      }
    }

    return {
      nickname: name,
      fallback: getAcronymFromString(name),
    };
  });
