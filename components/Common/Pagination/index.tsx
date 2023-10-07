'use client';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

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
   * @default 1
   */
  currentPageSiblingsCount?: number;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  pages,
  currentPageSiblingsCount = 1,
}) => {
  const intl = useIntl();

  const parsedPages = useGetPageElements(
    currentPage,
    pages,
    currentPageSiblingsCount
  );

  return (
    <nav
      aria-label={intl.formatMessage({
        id: 'components.common.pagination.defaultLabel',
      })}
      className={styles.pagination}
    >
      <Button
        type="button"
        aria-label={intl.formatMessage({
          id: 'components.common.pagination.prevAriaLabel',
        })}
        disabled={currentPage === 1}
        variant="secondary"
        className={styles.previousButton}
      >
        <ArrowLeftIcon className={styles.arrowIcon} />
        <span>
          <FormattedMessage id={'components.common.pagination.prev'} />
        </span>
      </Button>
      <ol className={styles.list}>{parsedPages}</ol>
      <Button
        type="button"
        aria-label={intl.formatMessage({
          id: 'components.common.pagination.nextAriaLabel',
        })}
        disabled={currentPage === pages.length}
        variant="secondary"
        className={styles.nextButton}
      >
        <span>
          <FormattedMessage id={'components.common.pagination.next'} />
        </span>
        <ArrowRightIcon className={styles.arrowIcon} />
      </Button>
    </nav>
  );
};

export default Pagination;
