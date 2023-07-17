import { useCallback, useContext, useMemo } from 'react';
import { useRouter } from './useRouter';
import { BlogDataContext } from '@/providers/blogDataProvider';

export const useBlogData = () => {
  const { asPath } = useRouter();

  const { posts, pagination, categories } = useContext(BlogDataContext);

  const getPostsByCategory = useCallback(
    (category: string) => posts.filter(post => post.category === category),
    [posts]
  );

  const getPostsByYear = useCallback(
    (year: number) =>
      posts.filter(post => new Date(post.date).getFullYear() === year),
    [posts]
  );

  const getPagination = useCallback(
    (currentYear: number) => ({
      next: pagination.includes(currentYear + 1) ? currentYear + 1 : undefined,
      prev: pagination.includes(currentYear - 1) ? currentYear - 1 : undefined,
    }),
    [pagination]
  );

  const currentCategory = useMemo(() => {
    // We split the pathname to retrieve the blog category from it
    // since the URL is usually /{languageCode}/blog/{category}
    // the third path piece is usually the category name
    const [, , pathname, category] = asPath.split('/');

    if (pathname === 'blog' && category && category.length) {
      return category;
    }

    // if either the pathname does not match to a blog page
    // which should not happen (as this hook should only be used in blog pages)
    // or if there is no category in the URL we return the current year as category name
    // which is always the default category (for example, the blog index)
    return new Date().getFullYear().toString();
  }, [asPath]);

  return {
    posts,
    categories,
    currentCategory,
    getPostsByCategory,
    getPostsByYear,
    getPagination,
  };
};
