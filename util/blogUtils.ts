import type { BlogPreviewType } from '@/types';

export const mapBlogCategoryToPreviewType = (type: string): BlogPreviewType => {
  switch (type) {
    case 'announcements':
    case 'release':
    case 'vulnerability':
      return type;
    case 'events':
      return 'announcements';
    default:
      return 'announcements';
  }
};

// @todo: we should check about the future of GitHub avatars
// and mapping them to the respective users
// @see https://github.com/nodejs/nodejs.dev/blob/main/src/data/blog/authors.yaml
export const mapAuthorToCardAuthors = (author: string, username?: string) => {
  const authors = author.split(/, | and |;| by /i);
  const usernames = username?.split(/, | and |;| by /i) || [];

  return authors.map((fullName, index) => ({
    fullName,
    src: `https://github.com/${usernames[index]}.png?size=40`,
  }));
};
