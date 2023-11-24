import { cache } from 'react';

import generateBlogData from '@/next-data/generators/blogData.mjs';
import type { BlogDataRSC } from '@/types';

const blogData = generateBlogData();

const provideBlogData = cache(
  async (category?: string): Promise<BlogDataRSC> => {
    return blogData.then(({ posts, categories, pagination }) => {
      const meta = { categories, pagination };

      if (category && categories.includes(category)) {
        return {
          posts: posts.filter(post => post.category === category),
          pagination: { next: null, prev: null },
          meta,
        };
      }

      if (category && category.startsWith('year-')) {
        const paramYear = Number(category.replace('year-', ''));

        const isEqualYear = (date: string) =>
          new Date(date).getFullYear() === paramYear;

        return {
          posts: posts.filter(({ date }) => isEqualYear(date)),
          pagination: {
            next: pagination.includes(paramYear + 1) ? paramYear + 1 : null,
            prev: pagination.includes(paramYear - 1) ? paramYear - 1 : null,
          },
          meta,
        };
      }

      if (category && !categories.includes(category)) {
        return { posts: [], pagination: { next: null, prev: null }, meta };
      }

      return { posts, pagination: { next: null, prev: null }, meta };
    });
  }
);

export default provideBlogData;
