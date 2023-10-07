import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';

import Button from '@/components/Common/Button';

import styles from './index.module.css';
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
    <nav aria-label="Pagination" className={styles.pagination}>
      <Button
        type="button"
        aria-label={'Previous page'}
        disabled={currentPage === 1}
        variant="secondary"
        className={styles.previousButton}
      >
        <ArrowLeftIcon className={styles.arrowIcon} />
        <span>Previous</span>
      </Button>
      <ol className={styles.list}>{parsedPages}</ol>
      <Button
        type="button"
        aria-label={'Next page'}
        disabled={currentPage === pages.length}
        variant="secondary"
        className={styles.nextButton}
      >
        <span>Next</span>
        <ArrowRightIcon className={styles.arrowIcon} />
      </Button>
    </nav>
  );
};

export default Pagination;
