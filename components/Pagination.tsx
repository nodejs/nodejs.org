import { FormattedMessage } from 'react-intl';

import LocalisedLink from './LocalisedLink';

type PaginationProps = { prevSlug?: string; nextSlug?: string };

const Pagination = (props: PaginationProps) => (
  <nav aria-label="pagination" className="pagination">
    {props.nextSlug && (
      <LocalisedLink href={props.nextSlug}>
        &lt; <FormattedMessage id="components.pagination.next" />
      </LocalisedLink>
    )}

    {props.prevSlug && (
      <LocalisedLink href={props.prevSlug}>
        <FormattedMessage id="components.pagination.previous" /> &gt;
      </LocalisedLink>
    )}
  </nav>
);

export default Pagination;
