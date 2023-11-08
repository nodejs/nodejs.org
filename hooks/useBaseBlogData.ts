import { useMemo } from 'react';

import { blogData } from '@/next.json.mjs';

export const useBaseBlogData = (pathname: string) => {
  const { posts, pagination, categories } = blogData;

  const getPostsByCategory = (category: string) =>
    posts.filter(post => post.category === category);

  const getPostsByYear = (year: string) =>
    posts.filter(post => new Date(post.date).getFullYear() === Number(year));

  const getPagination = (currentYear: number | string) => {
    const _currentYear = Number(currentYear);

    return {
      next: pagination.includes(_currentYear + 1)
        ? _currentYear + 1
        : undefined,
      prev: pagination.includes(_currentYear - 1)
        ? _currentYear - 1
        : undefined,
    };
  };

  const currentCategory = useMemo(() => {
    // We split the pathname to retrieve the blog category from it
    // since the URL is usually /{languageCode}/blog/{category}
    // the third path piece is usually the category name
    const [, _pathname, category] = pathname.split('/');

    if (_pathname === 'blog' && category && category.length) {
      return category;
    }

    // if either the pathname does not match to a blog page
    // which should not happen (as this hook should only be used in blog pages)
    // or if there is no category in the URL we return the current year as category name
    // which is always the default category (for example, the blog index)
    return `year-${new Date().getFullYear()}`;
  }, [pathname]);

  return {
    posts,
    categories,
    currentCategory,
    getPostsByCategory,
    getPostsByYear,
    getPagination,
  };
};
