import styles from './index.module.css';

import type { PaginationProps } from '.';

type ParsedPage = PaginationProps['pages'][number] & {
  pageNumber: number;
};

function parsePages(pages: PaginationProps['pages']): ParsedPage[] {
  return pages.map(({ url }, index) => ({
    url,
    pageNumber: index + 1,
  }));
}

const ellipsis = (
  <span aria-hidden="true" className={styles.ellipsis}>
    ...
  </span>
);

function createPageElements({
  parsedPages,
  currentPage,
}: Pick<PaginationProps, 'currentPage'> & { parsedPages: ParsedPage[] }) {
  return parsedPages.map(({ url, pageNumber }) => {
    return (
      <li
        key={pageNumber}
        aria-setsize={parsedPages.length}
        aria-posinset={pageNumber}
      >
        <a
          href={url}
          aria-label={`Go to page ${pageNumber}`}
          className={styles.listItem}
          {...(pageNumber === currentPage && { 'aria-current': 'page' })}
        >
          <span>{pageNumber}</span>
        </a>
      </li>
    );
  });
}

export const useGetPageElements = (
  currentPage: PaginationProps['currentPage'],
  pages: PaginationProps['pages'],
  currentPageSiblingsCount: number
) => {
  const parsedPages = parsePages(pages);
  const totalPages = parsedPages.length;
  /**
   * The combination of firstElement + currentElement + lastElement + 2 ellipses
   */
  const minimumElements = 5;

  const minimumAmountOfPages = currentPageSiblingsCount + minimumElements;

  if (totalPages <= minimumAmountOfPages) {
    return createPageElements({ parsedPages, currentPage });
  }

  const leftSiblingIndex = Math.max(
    currentPage - currentPageSiblingsCount - 1,
    1
  );
  const rightSiblingIndex = Math.min(
    currentPage + currentPageSiblingsCount,
    totalPages
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 0;
  const lastPageIndex = totalPages - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * currentPageSiblingsCount;
    const leftRange = parsedPages.slice(firstPageIndex, leftItemCount);

    return [
      ...createPageElements({ parsedPages: leftRange, currentPage }),
      ellipsis,
      ...createPageElements({
        parsedPages: parsedPages.slice(lastPageIndex),
        currentPage,
      }),
    ];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * currentPageSiblingsCount;
    const rightRange = parsedPages.slice(totalPages - rightItemCount);

    return [
      ...createPageElements({
        parsedPages: parsedPages.slice(firstPageIndex, firstPageIndex + 1),
        currentPage,
      }),
      ellipsis,
      ...createPageElements({ parsedPages: rightRange, currentPage }),
    ];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = parsedPages.slice(leftSiblingIndex, rightSiblingIndex);

    return [
      ...createPageElements({
        parsedPages: parsedPages.slice(firstPageIndex, firstPageIndex + 1),
        currentPage,
      }),
      ellipsis,
      ...createPageElements({ parsedPages: middleRange, currentPage }),
      ellipsis,
      ...createPageElements({
        parsedPages: parsedPages.slice(lastPageIndex),
        currentPage,
      }),
    ];
  }
};
