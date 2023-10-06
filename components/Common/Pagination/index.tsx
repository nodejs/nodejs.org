import type { FC } from 'react';

import { useGetParsedPages } from './useGetParsedPages';

type Page = {
  url: string;
};

export type PaginationProps = {
  /**
   * One-based number of the current page
   */
  currentPage: number;
  pages: Page[];
};

const Pagination: FC<PaginationProps> = ({ currentPage, pages }) => {
  const parsedPages = useGetParsedPages(pages);

  const pageItems = parsedPages.map(({ url, pageNumber }) => {
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

  return (
    <nav aria-label="Pagination">
      <button
        type="button"
        aria-label={'Previous page'}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <ol>{pageItems}</ol>
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
