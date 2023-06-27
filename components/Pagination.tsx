import { FormattedMessage } from 'react-intl';
import LocalizedLink from './LocalizedLink';
import type { FC } from 'react';

type PaginationProps = { prevSlug?: number; nextSlug?: number };

const Pagination: FC<PaginationProps> = ({ nextSlug, prevSlug }) => (
  <nav aria-label="pagination" className="pagination">
    {nextSlug && (
      <LocalizedLink href={`/blog/year-${nextSlug}`}>
        &lt; <FormattedMessage id="components.pagination.next" />
      </LocalizedLink>
    )}

    {prevSlug && (
      <LocalizedLink href={`/blog/year-${prevSlug}`}>
        <FormattedMessage id="components.pagination.previous" /> &gt;
      </LocalizedLink>
    )}
  </nav>
);

export default Pagination;
