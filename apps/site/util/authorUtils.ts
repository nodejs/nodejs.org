import { authors } from '@/next.json.mjs';
import type { AuthorProps } from '@/types';
import { getGitHubAvatarUrl } from '@/util/gitHubUtils';
import { getAcronymFromString } from '@/util/stringUtils';

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

export const getAuthorWithId = (usernames: Array<string>, hasUrl: boolean) => {
  const mapIdToAuthor = (username: string) => {
    const author = Object.values(authors).find(
      ({ id }) => id.toLowerCase() === username.toLowerCase()
    );

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
  };

  return usernames.map(mapIdToAuthor);
};

export const getAuthorWithName = (names: Array<string>, hasUrl: boolean) => {
  const mapNameToAuthor = (username: string) => {
    if (Object.keys(authors).includes(username)) {
      if (username in authors) {
        const { id, name, website } = authors[username];

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
      nickname: username,
      fallback: getAcronymFromString(username),
    };
  };

  return names.map(mapNameToAuthor);
};

export const getAuthors = ({ usernames, names, clickable }: AuthorProps) => {
  if (usernames) {
    return getAuthorWithId(usernames, clickable ?? true);
  }

  return getAuthorWithName(names || [], clickable ?? true);
};
