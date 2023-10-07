import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';

import Button from '@/components/Common/Button';

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
    <nav
      aria-label="Pagination"
      className="grid items-center justify-between [grid-template-areas:'page-buttons_page-buttons_page-buttons''previous-button_._next-button'] md:[grid-template-areas:'previous-button_page-buttons_next-button']"
    >
      <Button
        type="button"
        aria-label={'Previous page'}
        disabled={currentPage === 1}
        variant="secondary"
        className="flex items-center gap-2 text-sm [grid-area:previous-button]"
      >
        <ArrowLeftIcon className="h-5 shrink-0 text-neutral-600 dark:text-neutral-400" />
        <span>Previous</span>
      </Button>
      <ol className="flex list-none justify-center gap-0.5 [grid-area:page-buttons]">
        {parsedPages}
      </ol>
      <Button
        type="button"
        aria-label={'Next page'}
        disabled={currentPage === pages.length}
        variant="secondary"
        className="flex items-center gap-2 text-sm [grid-area:next-button]"
      >
        <span>Next</span>
        <ArrowRightIcon className="h-5 shrink-0 text-neutral-600 dark:text-neutral-400" />
      </Button>
    </nav>
  );
};

export default Pagination;
