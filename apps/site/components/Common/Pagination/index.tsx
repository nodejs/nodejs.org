import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { useGetPageElements } from '@/components/Common/Pagination/useGetPageElements';
import WithButton from '@/components/withButton';

import styles from './index.module.css';

type Page = { url: string };

type PaginationProps = {
  // One-based number of the current page
  currentPage: number;
  pages: Array<Page>;
  // The number of page buttons on each side of the current page button
  // @default 1
  currentPageSiblingsCount?: number;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  pages,
  currentPageSiblingsCount = 1,
}) => {
  const t = useTranslations();

  const parsedPages = useGetPageElements(
    currentPage,
    pages,
    currentPageSiblingsCount
  );

  return (
    <nav
      aria-label={t('components.common.pagination.defaultLabel')}
      className={styles.pagination}
    >
      <WithButton
        aria-label={t('components.common.pagination.prevAriaLabel')}
        disabled={currentPage === 1}
        kind="secondary"
        className={styles.previousButton}
        href={pages[currentPage - 2]?.url}
      >
        <ArrowLeftIcon className={styles.arrowIcon} />
        <span>{t('components.common.pagination.prev')}</span>
      </WithButton>

      <ol className={styles.list}>{parsedPages}</ol>

      <WithButton
        aria-label={t('components.common.pagination.nextAriaLabel')}
        disabled={currentPage === pages.length}
        kind="secondary"
        className={styles.nextButton}
        href={pages[currentPage]?.url}
      >
        <span>{t('components.common.pagination.next')}</span>
        <ArrowRightIcon className={styles.arrowIcon} />
      </WithButton>
    </nav>
  );
};

export default Pagination;
