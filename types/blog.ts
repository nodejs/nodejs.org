export interface BlogPost {
  title: string;
  author?: string;
  date: string;
  category: string;
  slug: string;
  file: string;
}

export interface BlogData {
  posts: BlogPost[];
  currentCategory: string;
  pagination: { prev?: string; next?: string };
}
