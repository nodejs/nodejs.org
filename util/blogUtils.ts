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
export const mapAuthorToCardAuthors = (author: string) => {
  const authors = author.split(/, | and |;| by /i);

  return authors.map(fullName => ({
    fullName,
    src: `https://ui-avatars.com/api/?name=${fullName}`,
  }));
};
