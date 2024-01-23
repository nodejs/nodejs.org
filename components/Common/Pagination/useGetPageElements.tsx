import type { ComponentProps } from 'react';

import type Pagination from '@/components/Common/Pagination';
import Ellipsis from '@/components/Common/Pagination/Ellipsis';
import type { PaginationListItemProps } from '@/components/Common/Pagination/PaginationListItem/index';
import PaginationListItem from '@/components/Common/Pagination/PaginationListItem/index';

const parsePages = (
  pages: ComponentProps<typeof Pagination>['pages'],
  currentPage: number,
  totalPages: number
): Array<PaginationListItemProps> =>
  pages.map(({ url }, index) => ({
    url,
    pageNumber: index + 1,
    currentPage,
    totalPages,
  }));

const createPaginationListItems = (
  parsedPages: Array<PaginationListItemProps>
) => parsedPages.map(page => <PaginationListItem key={page.url} {...page} />);

// The minimum amount of elements are first page, current page, and last page
const MINIMUM_AMOUNT_OF_ELEMENTS = 3;

// Not more than two ellipses will be shown at the same time
const MAXIMUM_AMOUNT_OF_ELLIPSES = 2;

// The logic of this custom hook has taken the internal logic of
// React MUI's Pagination component as reference. More info here:
// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/usePagination/usePagination.js
export const useGetPageElements = (
  currentPage: ComponentProps<typeof Pagination>['currentPage'],
  pages: ComponentProps<typeof Pagination>['pages'],
  currentPageSiblingsCount: number
) => {
  const totalPages = pages.length;
  const parsedPages = parsePages(pages, currentPage, totalPages);
  const currentPageIndex = currentPage - 1;

  // We multiply it by two (2) as siblings are located on both left and right sides
  // of the current page
  const totalSiblingsCount = 2 * currentPageSiblingsCount;

  const visiblePages =
    totalSiblingsCount +
    MINIMUM_AMOUNT_OF_ELEMENTS +
    MAXIMUM_AMOUNT_OF_ELLIPSES;

  // When there are more pages than the visible pages to be shown
  // we do not need to perform any calculations
  if (totalPages <= visiblePages) {
    return createPaginationListItems(parsedPages);
  }

  // The index of the far-left sibling of the current page
  const leftSiblingsFirstIndex = Math.max(
    currentPageIndex - currentPageSiblingsCount,
    1
  );

  // The index of the far-right sibling of the current page
  const rightSiblingsLastIndex = Math.min(
    currentPageIndex + currentPageSiblingsCount + 1,
    totalPages
  );

  const firstIndex = 0;
  const lastIndex = totalPages - 1;

  // If there are at least two (2) elements between the far-left sibling of
  // the current page, and the first page, we should show left ellipsis
  // between them
  const hasLeftEllipsis = leftSiblingsFirstIndex > firstIndex + 2;

  // If there are at least two (2) elements between the far-right sibling of
  // the current page, and the last page, we should show right ellipsis
  // between them
  const hasRightEllipsis = rightSiblingsLastIndex < lastIndex - 1;

  if (!hasLeftEllipsis && hasRightEllipsis) {
    const leftPagesLastIndex = MINIMUM_AMOUNT_OF_ELEMENTS + totalSiblingsCount;

    const leftPages = parsedPages.slice(firstIndex, leftPagesLastIndex);

    return [
      ...createPaginationListItems(leftPages),
      <Ellipsis key="ellipsis" />,
      ...createPaginationListItems(parsedPages.slice(lastIndex)),
    ];
  }

  if (hasLeftEllipsis && !hasRightEllipsis) {
    const rightPagesFirstIndex =
      MINIMUM_AMOUNT_OF_ELEMENTS + totalSiblingsCount;

    const rightPages = parsedPages.slice(totalPages - rightPagesFirstIndex);

    return [
      ...createPaginationListItems(
        parsedPages.slice(firstIndex, firstIndex + 1)
      ),
      <Ellipsis key="ellipsis" />,
      ...createPaginationListItems(rightPages),
    ];
  }

  if (hasLeftEllipsis && hasRightEllipsis) {
    const middlePages = parsedPages.slice(
      leftSiblingsFirstIndex,
      rightSiblingsLastIndex
    );

    return [
      ...createPaginationListItems(
        parsedPages.slice(firstIndex, firstIndex + 1)
      ),
      <Ellipsis key="ellipsis-1" />,
      ...createPaginationListItems(middlePages),
      <Ellipsis key="ellipsis-2" />,
      ...createPaginationListItems(parsedPages.slice(lastIndex)),
    ];
  }
};
