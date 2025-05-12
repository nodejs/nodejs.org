import type { BlogCategory, BlogPostsRSC } from '#site/types';

import {
  provideBlogPosts,
  providePaginatedBlogPosts,
} from './providers/blogData';

const getBlogData = (cat: BlogCategory, page?: number): BlogPostsRSC => {
  return page && page >= 1
    ? // This allows us to blindly get all blog posts from a given category
      // if the page number is 0 or something smaller than 1
      providePaginatedBlogPosts(cat, page)
    : provideBlogPosts(cat);
};

export default getBlogData;
