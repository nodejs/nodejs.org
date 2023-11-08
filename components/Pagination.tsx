import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { Link } from '@/navigation.mjs';

type PaginationProps = { prev?: number; next?: number };

const Pagination: FC<PaginationProps> = ({ next, prev }) => {
  const t = useTranslations();

  return (
    <nav aria-label="pagination" className="pagination">
      {next && (
        <Link href={`/blog/year-${next}`}>
          &lt; {t('components.pagination.next')}
        </Link>
      )}

      {prev && (
        <Link href={`/blog/year-${prev}`}>
          {t('components.pagination.previous')} &gt;
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
