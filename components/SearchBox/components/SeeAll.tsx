import type { Results } from '@orama/orama';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import type { SearchDoc } from '@/components/SearchBox/components/SearchBox';

import styles from './index.module.css';

type SearchResults = Results<SearchDoc>;

type SeeAllProps = {
  searchResults: SearchResults;
  searchTerm: string;
  selectedFacetName: string;
};

export const SeeAll: FC<SeeAllProps> = props => {
  const t = useTranslations();
  const resultsCount = props.searchResults?.count?.toLocaleString('en') ?? 0;

  if (!props.searchTerm) {
    return null;
  }

  return (
    <div className={styles.seeAllFulltextSearchResults}>
      <NextLink
        href={`/en/search?q=${props.searchTerm}&section=${props.selectedFacetName}`}
      >
        {t('components.search.seeAll.text', { count: resultsCount })}
      </NextLink>
    </div>
  );
};
