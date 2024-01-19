import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { Results, Nullable } from '@orama/orama';
import clx from 'classnames';
import { useRouter } from 'next/navigation';
import { useState, useRef, type FC, useEffect } from 'react';

import styles from '@/components/SearchBox/components/index.module.css';
import { PoweredBy } from '@/components/SearchBox/components/PoweredBy';
import { SearchResult } from '@/components/SearchBox/components/SearchResult';
import { SeeAll } from '@/components/SearchBox/components/SeeAll';
import { orama } from '@/components/SearchBox/lib/orama';
import { useClickOutside } from '@/components/SearchBox/lib/useClickOutside';

import { EmptyState } from './EmptyState';
import { NoResults } from './NoResults';

export type SearchDoc = {
  id: string;
  path: string;
  pageTitle: string;
  siteSection: string;
  pageSectionTitle: string;
  pageSectionContent: string;
};

type SearchResults = Nullable<Results<SearchDoc>>;

type SearchBoxProps = {
  onClose: () => void;
};

export const SearchBox: FC<SearchBoxProps> = props => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>(null);
  const [selectedFacet, setSelectedFacet] = useState<number>(0);
  const [searchError, setSearchError] = useState<Nullable<Error>>(null);

  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchBoxRef, () => {
    reset();
    props.onClose();
  });

  useEffect(() => {
    searchInputRef.current?.focus();
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    search(searchTerm);
  }, [searchTerm, selectedFacet]);

  function search(term: string) {
    orama
      .search({
        term,
        limit: 8,
        threshold: 0,
        boost: {
          pageSectionTitle: 4,
          pageSectionContent: 2.5,
          pageTitle: 1,
        },
        facets: {
          siteSection: {},
        },
        ...filterBySection(),
      })
      .then(setSearchResults)
      .catch(setSearchError);
  }

  function reset() {
    setSearchTerm('');
    setSearchResults(null);
    setSelectedFacet(0);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/en/search?q=${searchTerm}&section=${selectedFacetName}`);
  }

  function changeFacet(idx: number) {
    setSelectedFacet(idx);
  }

  function filterBySection() {
    if (selectedFacet === 0) {
      return {};
    }

    return {
      where: {
        siteSection: {
          eq: selectedFacetName,
        },
      },
    };
  }

  const facets = {
    all: searchResults?.count ?? 0,
    ...(searchResults?.facets?.siteSection?.values ?? {}),
  };

  const selectedFacetName = Object.keys(facets)[selectedFacet];

  return (
    <div className={styles.searchBoxModalContainer}>
      <div className={styles.searchBoxModalPanel} ref={searchBoxRef}>
        <div className={styles.searchBoxInnerPanel}>
          <div className={styles.searchBoxInputContainer}>
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
                className={clx(styles.fulltextSearchSection, {
                  [styles.fulltextSearchSectionSelected]: selectedFacet === idx,
                })}
                onClick={() => changeFacet(idx)}
              >
                {facetName}
                <span className={styles.fulltextSearchSectionCount}>
                  (
                  {facets[facetName as keyof typeof facets].toLocaleString(
                    'en'
                  )}
                  )
                </span>
              </button>
            ))}
          </div>

          <div className={styles.fulltextResultsContainer}>
            {searchError ? <></> : null}

            {(searchTerm ? (
              searchResults?.count ? (
                searchResults?.hits.map(hit => (
                  <SearchResult
                    key={hit.id}
                    hit={hit}
                    searchTerm={searchTerm}
                  />
                ))
              ) : (
                <NoResults searchTerm={searchTerm} />
              )
            ) : (
              <EmptyState />
            )) ?? null}

            {searchResults?.count
              ? searchResults?.count > 8 && (
                  <SeeAll
                    searchResults={searchResults}
                    searchTerm={searchTerm}
                    selectedFacetName={selectedFacetName}
                  />
                )
              : null}
          </div>
          <PoweredBy />
        </div>
      </div>
    </div>
  );
};
