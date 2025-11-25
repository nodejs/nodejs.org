import { BLOG_POSTS_PER_PAGE } from '#site/next.constants.mjs';
import { blogData } from '#site/next.json.mjs';

import type { BlogCategory, BlogPostsRSC, BlogPreviewType } from '#site/types';

export const mapBlogCategoryToPreviewType = (type: string): BlogPreviewType => {
  switch (type) {
    case 'announcements':
    case 'release':
    case 'vulnerability':
      return type;
    case 'events':
      return 'announcements';
    default:
      return 'announcements';
  }
};

export const getBlogPosts = (category: BlogCategory): BlogPostsRSC => {
  const categoryPosts = blogData.posts.filter(post =>
    post.categories.includes(category)
  );

  // Total amount of possible pages given the amount of blog posts
  const total = categoryPosts.length / BLOG_POSTS_PER_PAGE;

  return {
    posts: categoryPosts,
    pagination: {
      prev: null,
      next: null,
      // In case the division results on a remainder we need
      // to have an extra page containing the remainder entries
      pages: Math.ceil(total),
      total: categoryPosts.length,
    },
  };
};

export const paginateBlogPosts = (
  { posts, pagination }: BlogPostsRSC,
  page: number
): BlogPostsRSC => {
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
};

export const getBlogData = (cat: BlogCategory, page?: number): BlogPostsRSC => {
  const posts = getBlogPosts(cat);

  return page && page >= 1 ? paginateBlogPosts(posts, page) : posts;
};
