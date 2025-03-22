import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';

import Button from '@node-core/ui-components/Common/BaseButton';
import { useGetPageElements } from '@node-core/ui-components/Common/BasePagination/useGetPageElements';
import type { LinkLike } from '@node-core/ui-components/types';

import styles from './index.module.css';

type Page = { url: string };

export type PaginationProps = {
  // One-based number of the current page
  currentPage: number;
  pages: Array<Page>;
  // The number of page buttons on each side of the current page button
  // @default 1
  currentPageSiblingsCount?: number;
  as?: LinkLike;
  getPageLabel: (pageNumber: number) => string;
  labels: {
    aria: string;
    prevAria: string;
    prev: string;
    nextAria: string;
    next: string;
  };
};

const BasePagination: FC<PaginationProps> = ({
  currentPage,
  pages,
  as = 'a',
  currentPageSiblingsCount = 1,
  labels,
  getPageLabel,
}) => {
  const parsedPages = useGetPageElements(
    currentPage,
    pages,
    currentPageSiblingsCount,
    as,
    getPageLabel
  );

  return (
    <nav aria-label={labels.aria} className={styles.pagination}>
      <Button
        as={as}
        aria-label={labels.prevAria}
        disabled={currentPage === 1}
        kind="secondary"
        className={styles.previousButton}
        href={pages[currentPage - 2]?.url}
      >
        <ArrowLeftIcon className={styles.arrowIcon} />
        <span>{labels.prev}</span>
      </Button>

      <ol className={styles.list}>{parsedPages}</ol>

      <Button
        as={as}
        aria-label={labels.nextAria}
        disabled={currentPage === pages.length}
        kind="secondary"
        className={styles.nextButton}
        href={pages[currentPage]?.url}
      >
        <span>{labels.next}</span>
        <ArrowRightIcon className={styles.arrowIcon} />
      </Button>
    </nav>
  );
};

export default BasePagination;
