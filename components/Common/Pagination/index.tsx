import type { FC } from 'react';

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
  const pageItems = pages.map(({ url }, index) => {
    const pageNumber = index + 1;

    return (
      <li key={url}>
        <a
          href={url}
          {...(pageNumber === currentPage && { 'aria-current': 'page' })}
        >
          {pageNumber}
        </a>
      </li>
    );
  });

  return (
    <nav>
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
