import { createContext } from 'react';
import blogData from '@/public/blog-posts-data.json';
import type { FC, PropsWithChildren } from 'react';
import type { BlogData } from '@/types';

export const BlogDataContext = createContext<BlogData>({
  posts: [],
  pagination: [],
  categories: [],
});

export const BlogDataProvider: FC<PropsWithChildren> = ({ children }) => (
  <BlogDataContext.Provider value={blogData}>
    {children}
  </BlogDataContext.Provider>
);
