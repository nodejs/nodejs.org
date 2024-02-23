import type { Results } from '@orama/orama';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import type { SearchDoc } from '@/types';

import styles from './index.module.css';

type SearchResults = Results<SearchDoc>;

type SeeAllProps = {
  searchResults: SearchResults;
  searchTerm: string;
  selectedFacetName: string;
  onSeeAllClick: () => void;
};

export const WithAllResults: FC<SeeAllProps> = props => {
  const t = useTranslations();
  const params = useParams();

  const locale = params?.locale ?? 'en';
  const resultsCount = props.searchResults?.count?.toLocaleString('en') ?? 0;
  const searchParams = new URLSearchParams();

  searchParams.set('q', props.searchTerm);
  searchParams.set('section', props.selectedFacetName);

  const allResultsURL = `/${locale}/search?${searchParams.toString()}`;

  return (
    <div className={styles.seeAllFulltextSearchResults}>
      <NextLink href={allResultsURL} onClick={props.onSeeAllClick}>
        {t('components.search.seeAll.text', { count: resultsCount })}
      </NextLink>
    </div>
  );
};
