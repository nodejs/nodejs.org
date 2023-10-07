'use client';
import Link from 'next/link';
import { useIntl } from 'react-intl';

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
  intl,
}: Pick<PaginationProps, 'currentPage'> & {
  parsedPages: ParsedPage[];
  intl: ReturnType<typeof useIntl>;
}) {
  return parsedPages.map(({ url, pageNumber }) => {
    return (
      <li
        key={pageNumber}
        aria-setsize={parsedPages.length}
        aria-posinset={pageNumber}
      >
        <Link
          prefetch={false}
          href={url}
          aria-label={intl.formatMessage(
            {
              id: 'components.common.pagination.pageLabel',
            },
            {
              pageNumber,
            }
          )}
          className={styles.listItem}
          {...(pageNumber === currentPage && { 'aria-current': 'page' })}
        >
          <span>{pageNumber}</span>
        </Link>
      </li>
    );
  });
}

export const useGetPageElements = (
  currentPage: PaginationProps['currentPage'],
  pages: PaginationProps['pages'],
  currentPageSiblingsCount: number
) => {
  const intl = useIntl();

  const parsedPages = parsePages(pages);
  const totalPages = parsedPages.length;
  /**
   * The combination of firstElement + currentElement + lastElement + 2 ellipses
   */
  const minimumElements = 5;

  const minimumAmountOfPages = currentPageSiblingsCount + minimumElements;

  if (totalPages <= minimumAmountOfPages) {
    return createPageElements({ parsedPages, currentPage, intl });
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
      ...createPageElements({ parsedPages: leftRange, currentPage, intl }),
      ellipsis,
      ...createPageElements({
        parsedPages: parsedPages.slice(lastPageIndex),
        currentPage,
        intl,
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
        intl,
      }),
      ellipsis,
      ...createPageElements({ parsedPages: rightRange, currentPage, intl }),
    ];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = parsedPages.slice(leftSiblingIndex, rightSiblingIndex);

    return [
      ...createPageElements({
        parsedPages: parsedPages.slice(firstPageIndex, firstPageIndex + 1),
        currentPage,
        intl,
      }),
      ellipsis,
      ...createPageElements({ parsedPages: middleRange, currentPage, intl }),
      ellipsis,
      ...createPageElements({
        parsedPages: parsedPages.slice(lastPageIndex),
        currentPage,
        intl,
      }),
    ];
  }
};
