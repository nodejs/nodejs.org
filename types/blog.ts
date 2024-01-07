export interface BlogPost {
  title: string;
  author: string;
  date: string;
  category: string;
  slug: string;
}

export interface BlogData {
  posts: Array<BlogPost>;
  pagination: Array<number>;
  categories: Array<string>;
}

export interface BlogDataRSC {
  posts: Array<BlogPost>;
  pagination: {
    next: number | null;
    prev: number | null;
  };
  meta: {
    categories: Array<string>;
    pagination: Array<number>;
  };
}
