export interface BlogPost {
  title: string;
  author: string;
  date: string;
  category: string;
  slug: string;
}

export interface BlogData {
  posts: BlogPost[];
  pagination: number[];
  categories: string[];
}

export interface BlogDataRSC {
  posts: BlogPost[];
  pagination: {
    next: number | null;
    prev: number | null;
  };
  meta: {
    categories: string[];
    pagination: number[];
  };
}
