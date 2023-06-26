import { useCallback, useContext, useMemo } from 'react';
import { useRouter } from './useRouter';
import { BlogDataContext } from '../providers/blogDataProvider';

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

  const currentCategory = useMemo(
    () => asPath.split('/')[3] || new Date().getFullYear().toString(),
    [asPath]
  );

  return {
    posts,
    categories,
    currentCategory,
    getPostsByCategory,
    getPostsByYear,
    getPagination,
  };
};
