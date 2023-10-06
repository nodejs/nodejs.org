import type { FC } from 'react';

const Pagination: FC = () => {
  return (
    <nav>
      <button type="button" aria-label={'Previous page'}>
        Previous
      </button>
      <button type="button" aria-label={'Next page'}>
        Next
      </button>
    </nav>
  );
};

export default Pagination;
