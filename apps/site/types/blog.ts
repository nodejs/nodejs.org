import type { IntlMessageKeys } from './i18n';

export type BlogPreviewType = 'announcements' | 'release' | 'vulnerability';
export type BlogCategory = IntlMessageKeys<'layouts.blog.categories'>;

export type BlogPost = {
  title: string;
  author: string;
  username: string;
  date: string;
  categories: Array<BlogCategory>;
  slug: string;
};

export type BlogData = {
  posts: Array<BlogPost>;
  categories: Array<BlogCategory>;
};

export type BlogPagination = {
  next: number | null;
  prev: number | null;
  pages: number;
  total: number;
};

export type BlogPostsRSC = {
  posts: Array<BlogPost>;
  pagination: BlogPagination;
};
