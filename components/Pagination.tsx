import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';
import type { BlogPagination } from '@/types';

type PaginationProps = BlogPagination & { category: string };

const Pagination: FC<PaginationProps> = ({ category, next, prev }) => {
  const t = useTranslations();

  return (
    <nav aria-label="pagination" className="pagination">
      {prev && (
        <Link href={`/blog/${category}/page/${prev}`}>
          &lt; {t('components.pagination.previous')}
        </Link>
      )}

      {prev && next && ' | '}

      {next && (
        <Link href={`/blog/${category}/page/${next}`}>
          {t('components.pagination.next')} &gt;
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
