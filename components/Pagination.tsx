import { FormattedMessage } from 'react-intl';
import LocalizedLink from './LocalizedLink';
import type { FC } from 'react';

type PaginationProps = { prevSlug?: string; nextSlug?: string };

const Pagination: FC<PaginationProps> = ({ nextSlug, prevSlug }) => (
  <nav aria-label="pagination" className="pagination">
    {nextSlug && (
      <LocalizedLink href={nextSlug}>
        &lt; <FormattedMessage id="components.pagination.next" />
      </LocalizedLink>
    )}

    {prevSlug && (
      <LocalizedLink href={prevSlug}>
        <FormattedMessage id="components.pagination.previous" /> &gt;
      </LocalizedLink>
    )}
  </nav>
);

export default Pagination;
