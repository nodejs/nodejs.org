import { cache } from 'react';

import generateBlogData from '@/next-data/generators/blogData.mjs';
import { BLOG_POSTS_PER_PAGE } from '@/next.constants.mjs';
import type { BlogPostsRSC } from '@/types';

const { categories, posts } = await generateBlogData();

export const provideBlogCategories = cache(() => categories);

export const provideBlogPosts = cache((category: string): BlogPostsRSC => {
  const categoryPosts = posts
    .filter(post => post.categories.includes(category))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  // Total amount of possible pages given the amount of blog posts
  const total = categoryPosts.length / BLOG_POSTS_PER_PAGE;

  return {
    posts: categoryPosts,
    pagination: {
      prev: null,
      next: null,
      // In case the division results on a remainder we need
      // to have an extra page containing the remainder entries
      pages: Math.floor(total % 1 === 0 ? total : total + 1),
      total: categoryPosts.length,
    },
  };
});

export const providePaginatedBlogPosts = cache(
  (category: string, page: number): BlogPostsRSC => {
    const { posts, pagination } = provideBlogPosts(category);

    // This autocorrects if invalid numbers are given to only allow
    // actual valid numbers to be provided
    const actualPage = page < 1 ? 1 : page;

    // If the page is within the allowed range then we calculate
    // the pagination of Blog Posts for a given current page "page"
    if (actualPage <= pagination.pages) {
      return {
        posts: posts.slice(
          BLOG_POSTS_PER_PAGE * (actualPage - 1),
          BLOG_POSTS_PER_PAGE * actualPage
        ),
        pagination: {
          prev: actualPage > 1 ? actualPage - 1 : null,
          next: actualPage < pagination.pages ? actualPage + 1 : null,
          pages: pagination.pages,
          total: posts.length,
        },
      };
    }

    return {
      posts: [],
      pagination: {
        prev: pagination.total,
        next: null,
        pages: pagination.pages,
        total: posts.length,
      },
    };
  }
);
