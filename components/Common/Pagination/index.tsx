import type { FC } from 'react';

import { useGetPageElements } from './useGetPageElements';

type Page = {
  url: string;
};

export type PaginationProps = {
  /**
   * One-based number of the current page
   */
  currentPage: number;
  pages: Page[];
  /**
   * The number of page buttons on each side of the current page button
   * Defaults to 1
   */
  currentPageSiblingsCount?: number;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  pages,
  currentPageSiblingsCount = 1,
}) => {
  const parsedPages = useGetPageElements(
    currentPage,
    pages,
    currentPageSiblingsCount
  );

  return (
    <nav aria-label="Pagination">
      <button
        type="button"
        aria-label={'Previous page'}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <ol>{parsedPages}</ol>
      <button
        type="button"
        aria-label={'Next page'}
        disabled={currentPage === pages.length}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
