'use client';

import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import type { Results, Nullable } from '@orama/orama';
import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';

import styles from '@/components/Common/Search/States/index.module.css';
import { WithAllResults } from '@/components/Common/Search/States/WithAllResults';
import { WithError } from '@/components/Common/Search/States/WithError';
import { WithNoResults } from '@/components/Common/Search/States/WithNoResults';
import { WithPoweredBy } from '@/components/Common/Search/States/WithPoweredBy';
import { WithSearchResult } from '@/components/Common/Search/States/WithSearchResult';
import Tabs from '@/components/Common/Tabs';
import { useClickOutside, useKeyboardCommands } from '@/hooks/react-client';
import { useRouter } from '@/navigation.mjs';
import { DEFAULT_ORAMA_QUERY_PARAMS } from '@/next.constants.mjs';
import { search as oramaSearch, getInitialFacets } from '@/next.orama.mjs';
import type { SearchDoc } from '@/types';
import { searchHitToLinkPath } from '@/util/searchUtils';

type Facets = { [key: string]: number };

type SearchResults = Nullable<Results<SearchDoc>>;

type SearchBoxProps = { onClose: () => void };

export const WithSearchBox: FC<SearchBoxProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>(null);
  const [selectedResult, setSelectedResult] = useState<number>();
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

  const reset = () => {
    setSearchTerm('');
    setSearchResults(null);
    setSelectedResult(undefined);
    setSelectedFacet(0);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useClickOutside(searchBoxRef, handleClose);

  useEffect(() => {
    searchInputRef.current?.focus();

    getInitialFacets().then(setSearchResults).catch(setSearchError);

    return reset;
  }, []);

  useEffect(
    () => {
      search(searchTerm);
    },
    // we don't need to care about memoization of search function
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm, selectedFacet]
  );

  useKeyboardCommands(cmd => {
    if (searchError || !searchResults || searchResults.count <= 0) {
      return;
    }

    switch (true) {
      case cmd === 'down' && selectedResult === undefined:
        setSelectedResult(0);
        break;
      case cmd === 'down' &&
        selectedResult != undefined &&
        selectedResult < searchResults.count &&
        selectedResult < DEFAULT_ORAMA_QUERY_PARAMS.limit - 1:
        setSelectedResult(selectedResult + 1);
        break;
      case cmd === 'up' && selectedResult != undefined && selectedResult != 0:
        setSelectedResult(selectedResult - 1);
        break;
      case cmd === 'enter':
        handleEnter();
        break;
      default:
    }
  });

  const handleEnter = () => {
    if (!searchResults || !selectedResult) {
      return;
    }

    const selectedHit = searchResults.hits[selectedResult];

    if (!selectedHit) {
      return;
    }

    handleClose();
    router.push(searchHitToLinkPath(selectedHit));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleClose();
    router.push(`/search?q=${searchTerm}&section=${selectedFacetName}`);
  };

  const changeFacet = (idx: string) => setSelectedFacet(Number(idx));

  const filterBySection = () => {
    if (selectedFacet === 0) {
      return {};
    }

    return { where: { siteSection: { eq: selectedFacetName } } };
  };

  const facets: Facets = {
    all: searchResults?.facets
      ? Object.values(searchResults?.facets.siteSection.values).reduce(
          (a, b) => a + b,
          0
        )
      : 0,
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
                aria-activedescendant={
                  selectedResult !== undefined
                    ? `search-hit-${selectedResult}`
                    : undefined
                }
                aria-autocomplete="list"
                aria-controls="fulltext-results-container"
                aria-expanded={Boolean(!searchError && searchResults?.count)}
                autoComplete="off"
                role="combobox"
                type="search"
                className={styles.searchBoxInput}
                onChange={event => setSearchTerm(event.target.value)}
                value={searchTerm}
              />
            </form>
          </div>

          <div className={styles.fulltextSearchSections}>
            <Tabs
              activationMode="manual"
              defaultValue="0"
              autoFocus={true}
              tabs={Object.keys(facets).map((facetName, idx) => ({
                key: facetName,
                label: facetName,
                secondaryLabel: `(${facets[facetName].toLocaleString('en')})`,
                value: idx.toString(),
              }))}
              onValueChange={changeFacet}
            />
          </div>

          <div
            id="fulltext-results-container"
            className={styles.fulltextResultsContainer}
            role="listbox"
          >
            {searchError && <WithError />}

            {!searchError && (
              <>
                {searchResults &&
                  searchResults.count > 0 &&
                  searchResults.hits.map((hit, idx) => (
                    <WithSearchResult
                      key={hit.id}
                      hit={hit}
                      searchTerm={searchTerm}
                      selected={selectedResult === idx}
                      idx={idx}
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
