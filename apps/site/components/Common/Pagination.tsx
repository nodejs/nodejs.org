import BasePagination from '@node-core/ui-components/Common/BasePagination';
import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';

import type { PaginationProps } from '@node-core/ui-components/Common/BasePagination';
import type { FC } from 'react';

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
        prev: t('components.common.pagination.prev'),
        nextAria: t('components.common.pagination.nextAriaLabel'),
        next: t('components.common.pagination.next'),
      }}
      getPageLabel={pageNumber =>
        t('components.common.pagination.pageLabel', { pageNumber })
      }
      {...props}
    />
  );
};

export default Pagination;
