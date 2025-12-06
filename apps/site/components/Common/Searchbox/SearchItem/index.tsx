import SearchHit from '@node-core/ui-components/Common/Search/Results/Hit';
import { useLocale } from 'next-intl';

import type { Document } from '../DocumentLink';
import type { ComponentProps, FC } from 'react';

import { getFormattedPath } from './utils';

type SearchItemProps = Omit<
  ComponentProps<typeof SearchHit>,
  'document' | 'as'
> & {
  document: Document;
};

const SearchItem: FC<SearchItemProps> = ({ document, ...props }) => {
  const locale = useLocale();

  const href =
    document.siteSection?.toLowerCase() === 'docs'
      ? `/${document.path}`
      : `/${locale}/${document.path}`;

  return (
    <SearchHit
      document={{
        title: document.pageSectionTitle,
        description:
          document.pageSectionTitle &&
          getFormattedPath(document.path, document.pageSectionTitle),
        href,
      }}
      {...props}
    />
  );
};

export default SearchItem;
