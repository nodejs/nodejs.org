import { FormattedMessage } from 'react-intl';

import LocalizedLink from './LocalizedLink';

type PaginationProps = { prevSlug?: string; nextSlug?: string };

const Pagination = (props: PaginationProps) => (
  <nav aria-label="pagination" className="pagination">
    {props.nextSlug && (
      <LocalizedLink href={props.nextSlug}>
        &lt; <FormattedMessage id="components.pagination.next" />
      </LocalizedLink>
    )}

    {props.prevSlug && (
      <LocalizedLink href={props.prevSlug}>
        <FormattedMessage id="components.pagination.previous" /> &gt;
      </LocalizedLink>
    )}
  </nav>
);

export default Pagination;
