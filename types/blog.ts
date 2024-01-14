export type BlogPreviewType = 'announcements' | 'release' | 'vulnerability';

export interface BlogPost {
  title: string;
  author: string;
  date: Date;
  categories: Array<string>;
  slug: string;
}

export interface BlogData {
  posts: Array<BlogPost>;
  categories: Array<string>;
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
