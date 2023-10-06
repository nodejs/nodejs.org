import type { PaginationProps } from '.';

export const useGetPageElements = (
  currentPage: PaginationProps['currentPage'],
  pages: PaginationProps['pages']
) => {
  const parsedPages = pages.map(({ url }, index) => {
    const pageNumber = index + 1;

    return (
      <li
        key={pageNumber}
        aria-setsize={pages.length}
        aria-posinset={pageNumber}
      >
        <a
          href={url}
          aria-label={`Go to page ${pageNumber}`}
          {...(pageNumber === currentPage && { 'aria-current': 'page' })}
        >
          {pageNumber}
        </a>
      </li>
    );
  });

  const firstThreeItems = parsedPages.slice(0, 3);

  const availableLastItems = Math.min(parsedPages.length - 3, 3);

  const lastThreeItems =
    availableLastItems > 0 ? parsedPages.slice(-availableLastItems) : [];

  const ellipsis = <span aria-hidden="true">...</span>;

  const hasEllipsis = pages.length > 6;

  return [
    ...firstThreeItems,
    ...(hasEllipsis ? [ellipsis] : []),
    ...lastThreeItems,
  ];
};
