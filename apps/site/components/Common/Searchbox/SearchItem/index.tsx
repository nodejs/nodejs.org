import SearchHit from '@node-core/ui-components/Common/Search/Results/Hit';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import type { Document } from '../DocumentLink';
import type { LinkLike } from '@node-core/ui-components/types';
import type { ComponentProps, FC } from 'react';

import { getDocumentHref, getFormattedPath } from './utils';

type SearchItemProps = Omit<
  ComponentProps<typeof SearchHit>,
  'document' | 'as'
> & {
  document: Document;
};

const SearchItem: FC<SearchItemProps> = ({ document, ...props }) => {
  const locale = useLocale();

  return (
    <SearchHit
      document={{
        title: document.pageSectionTitle,
        description:
          document.pageSectionTitle &&
          getFormattedPath(document.path, document.pageSectionTitle),
        href: getDocumentHref(document, locale),
      }}
      as={Link as LinkLike}
      {...props}
    />
  );
};

export default SearchItem;
