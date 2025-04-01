import type { FC } from 'react';

import type { LinkLike } from '@node-core/ui-components/types';

import styles from './index.module.css';

export type PaginationListItemProps = {
  url: string;
  pageNumber: number;
  // One-based number of the current page
  currentPage: number;
  totalPages: number;
  as?: LinkLike;
  label: string;
};

const PaginationListItem: FC<PaginationListItemProps> = ({
  url,
  pageNumber,
  currentPage,
  totalPages,
  as: Component = 'a',
  label,
}) => {
  return (
    <li key={pageNumber} aria-setsize={totalPages} aria-posinset={pageNumber}>
      <Component
        href={url}
        aria-label={label}
        className={styles.listItem}
        {...(pageNumber === currentPage && { 'aria-current': 'page' })}
      >
        <span>{pageNumber}</span>
      </Component>
    </li>
  );
};

export default PaginationListItem;
