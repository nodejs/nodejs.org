export interface BlogPost {
  title: string;
  author?: string;
  date: string;
  category: string;
  slug: string;
  readingTime?: string; // TODO: verify this works when implementing blog
  file: string;
}

export interface BlogData {
  posts: BlogPost[];
  currentCategory: string;
  pagination: { prev?: string; next?: string };
}
