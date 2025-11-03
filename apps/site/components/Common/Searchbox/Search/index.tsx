'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SearchInput } from '@orama/ui/components';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';

import { DEFAULT_ORAMA_QUERY_PARAMS } from '#site/next.constants.mjs';
import { useSearchbox } from '#site/providers/searchboxProvider';

import { Footer } from '../Footer';
import { SearchResultsWrapper } from '../SearchResults';
import styles from './index.module.css';

type SearchProps = PropsWithChildren & React.RefAttributes<HTMLInputElement>;

export const Search: FC<SearchProps> = ({ ref }) => {
  const t = useTranslations();
  const searchbox = useSearchbox();
  const isSearchMode = searchbox?.mode === 'search';

  return (
    <div className={styles.searchContainer}>
      <SearchInput.Wrapper className={styles.searchInputWrapper}>
        <MagnifyingGlassIcon />
        <SearchInput.Input
          inputId="orama-doc-search"
          ariaLabel={t('components.search.searchPlaceholder')}
          placeholder={t('components.search.searchPlaceholder')}
          tabIndex={isSearchMode ? 0 : -1}
          aria-hidden={!isSearchMode}
          className={styles.searchInput}
          searchParams={{
            ...DEFAULT_ORAMA_QUERY_PARAMS,
            groupBy: {
              properties: ['siteSection'],
            },
            facets: {
              siteSection: {},
            },
          }}
          ref={ref}
        />
      </SearchInput.Wrapper>

      <SearchResultsWrapper />
      <Footer />
    </div>
  );
};
