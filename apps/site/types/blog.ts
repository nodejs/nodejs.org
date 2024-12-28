export type BlogPreviewType = 'announcements' | 'release' | 'vulnerability';
export type BlogCategory = IntlMessageKeys<'layouts.blog.categories'>;

export interface BlogPost {
  title: string;
  author: string;
  username: string;
  date: Date;
  categories: Array<BlogCategory>;
  slug: string;
}

export interface BlogData {
  posts: Array<BlogPost>;
  categories: Array<BlogCategory>;
}

export interface BlogPagination {
  next: number | null;
  prev: number | null;
  pages: number;
  total: number;
}

export interface BlogPostsRSC {
  posts: Array<BlogPost>;
  pagination: BlogPagination;
}
