import type { Results } from '@orama/orama';
import NextLink from 'next/link';
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
  if (!props.searchTerm) {
    return null;
  }

  return (
    <div className={styles.seeAllFulltextSearchResults}>
      <NextLink
        href={`/en/search?q=${props.searchTerm}&section=${props.selectedFacetName}`}
      >
        See all {props.searchResults?.count.toLocaleString('en')} results
      </NextLink>
    </div>
  );
};
