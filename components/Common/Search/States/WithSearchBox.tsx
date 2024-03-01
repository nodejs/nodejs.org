'use client';

import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import type { Results, Nullable } from '@orama/orama';
import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';

import styles from '@/components/Common/Search/States/index.module.css';
import { WithAllResults } from '@/components/Common/Search/States/WithAllResults';
import { WithEmptyState } from '@/components/Common/Search/States/WithEmptyState';
import { WithError } from '@/components/Common/Search/States/WithError';
import { WithNoResults } from '@/components/Common/Search/States/WithNoResults';
import { WithPoweredBy } from '@/components/Common/Search/States/WithPoweredBy';
import { WithSearchResult } from '@/components/Common/Search/States/WithSearchResult';
import { useClickOutside } from '@/hooks/react-client';
import { useRouter } from '@/navigation.mjs';
import { DEFAULT_ORAMA_QUERY_PARAMS } from '@/next.constants.mjs';
import { search as oramaSearch, getInitialFacets } from '@/next.orama.mjs';
import type { SearchDoc } from '@/types';
import { debounce } from '@/util/debounce';

type Facets = { [key: string]: number };

type SearchResults = Nullable<Results<SearchDoc>>;

type SearchBoxProps = { onClose: () => void };

export const WithSearchBox: FC<SearchBoxProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>(null);
  const [selectedFacet, setSelectedFacet] = useState<number>(0);
  const [searchError, setSearchError] = useState<Nullable<Error>>(null);

  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const search = (term: string) => {
    oramaSearch({
      term,
      ...DEFAULT_ORAMA_QUERY_PARAMS,
      mode: 'fulltext',
      returning: [
        'path',
        'pageSectionTitle',
        'pageTitle',
        'path',
        'siteSection',
      ],
      ...filterBySection(),
    })
      .then(setSearchResults)
      .catch(setSearchError);
  };

  useClickOutside(searchBoxRef, () => {
    reset();
    onClose();
  });

  useEffect(() => {
    searchInputRef.current?.focus();

    getInitialFacets().then(setSearchResults).catch(setSearchError);

    return reset;
  }, []);

  useEffect(
    () => debounce(() => search(searchTerm), 1000),
    // we don't need to care about memoization of search function
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm, selectedFacet]
  );

  const reset = () => {
    setSearchTerm('');
    setSearchResults(null);
    setSelectedFacet(0);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchTerm}&section=${selectedFacetName}`);
    onClose();
  };

  const changeFacet = (idx: number) => setSelectedFacet(idx);

  const filterBySection = () => {
    if (selectedFacet === 0) {
      return {};
    }

    return { where: { siteSection: { eq: selectedFacetName } } };
  };

  const facets: Facets = {
    all: searchResults?.count ?? 0,
    ...(searchResults?.facets?.siteSection?.values ?? {}),
  };

  const selectedFacetName = Object.keys(facets)[selectedFacet];

  return (
    <div className={styles.searchBoxModalContainer}>
      <div className={styles.searchBoxModalPanel} ref={searchBoxRef}>
        <div className={styles.searchBoxInnerPanel}>
          <div className={styles.searchBoxInputContainer}>
            <button
              onClick={onClose}
              className={styles.searchBoxBackIconContainer}
            >
              <ChevronLeftIcon className={styles.searchBoxBackIcon} />
            </button>

            <MagnifyingGlassIcon
              className={styles.searchBoxMagnifyingGlassIcon}
            />

            <form onSubmit={onSubmit}>
              <input
                ref={searchInputRef}
                type="search"
                className={styles.searchBoxInput}
                onChange={event => setSearchTerm(event.target.value)}
                value={searchTerm}
              />
            </form>
          </div>

          <div className={styles.fulltextSearchSections}>
            {Object.keys(facets).map((facetName, idx) => (
              <button
                key={facetName}
                className={classNames(styles.fulltextSearchSection, {
                  [styles.fulltextSearchSectionSelected]: selectedFacet === idx,
                })}
                onClick={() => changeFacet(idx)}
              >
                {facetName}
                <span className={styles.fulltextSearchSectionCount}>
                  ({facets[facetName].toLocaleString('en')})
                </span>
              </button>
            ))}
          </div>

          <div className={styles.fulltextResultsContainer}>
            {searchError && <WithError />}

            {!searchError && !searchTerm && <WithEmptyState />}

            {!searchError && searchTerm && (
              <>
                {searchResults &&
                  searchResults.count > 0 &&
                  searchResults.hits.map(hit => (
                    <WithSearchResult
                      key={hit.id}
                      hit={hit}
                      searchTerm={searchTerm}
                    />
                  ))}

                {searchResults && searchResults.count === 0 && (
                  <WithNoResults searchTerm={searchTerm} />
                )}

                {searchResults && searchResults.count > 8 && (
                  <WithAllResults
                    searchResults={searchResults}
                    searchTerm={searchTerm}
                    selectedFacetName={selectedFacetName}
                    onSeeAllClick={onClose}
                  />
                )}
              </>
            )}
          </div>

          <div className={styles.fulltextSearchFooter}>
            <WithPoweredBy />
          </div>
        </div>
      </div>
    </div>
  );
};
