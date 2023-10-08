import type { FC } from 'react';
import { useIntl } from 'react-intl';

import LocalizedLink from '@/components/LocalizedLink';

import styles from './index.module.css';

export type PaginationListItemProps = {
  url: string;
  pageNumber: number;
  /**
   * One-based number of the current page
   */
  currentPage: number;
  totalPages: number;
};

const PaginationListItem: FC<PaginationListItemProps> = ({
  url,
  pageNumber,
  currentPage,
  totalPages,
}) => {
  const intl = useIntl();

  return (
    <li key={pageNumber} aria-setsize={totalPages} aria-posinset={pageNumber}>
      <LocalizedLink
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
      </LocalizedLink>
    </li>
  );
};

export default PaginationListItem;
