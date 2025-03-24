import BasePagination from '@node-core/ui-components/Common/BasePagination';
import type { PaginationProps } from '@node-core/ui-components/Common/BasePagination';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';

const Pagination: FC<
  Omit<PaginationProps, 'as' | 'labels' | 'getPageLabel'>
> = props => {
  const t = useTranslations();
  return (
    <BasePagination
      as={Link}
      labels={{
        aria: t('components.common.pagination.defaultLabel'),
        prevAria: t('components.common.pagination.prevAriaLabel'),
        prev: t('components.pagination.previous'),
        nextAria: t('components.common.pagination.nextAriaLabel'),
        next: t('components.pagination.next'),
      }}
      getPageLabel={pageNumber =>
        t('components.common.pagination.pageLabel', { pageNumber })
      }
      {...props}
    />
  );
};

export default Pagination;
