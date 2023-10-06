import type { PaginationProps } from '.';

export const useGetParsedPages = (pages: PaginationProps['pages']) => {
  const parsedPages = pages.map(({ url }, index) => ({
    pageNumber: index + 1,
    url,
  }));

  const firstThreeItems = parsedPages.slice(0, 3);

  const availableLastItems = Math.min(parsedPages.length - 3, 3);

  const lastThreeItems =
    availableLastItems > 0 ? parsedPages.slice(-availableLastItems) : [];

  return [...firstThreeItems, ...lastThreeItems];
};
