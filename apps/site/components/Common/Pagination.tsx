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
        previousAriaLabel: t('components.common.pagination.previousAriaLabel'),
        previous: t('components.common.pagination.previous'),
        nextAriaLabel: t('components.common.pagination.nextAriaLabel'),
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
