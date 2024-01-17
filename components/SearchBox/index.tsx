import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { Results, Nullable } from '@orama/orama';
import clx from 'classnames';
import { useState, useRef, type FC, useEffect } from 'react';

import styles from './index.module.css';
import { orama, highlighter } from './lib/orama';

type SearchDoc = {
  id: string;
  path: string;
  pageTitle: string;
  siteSection: string;
  pageSectionTitle: string;
  pageSectionContent: string;
};

type SearchResults = Nullable<Results<SearchDoc>>;

export const SearchBox: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>(null);
  const [selectedFacet, setSelectedFacet] = useState<number>(0);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();

    return () => {
      setSearchTerm('');
      setSearchResults(null);
      setSelectedFacet(0);
    };
  }, []);

  useEffect(() => {
    search(searchTerm);
  }, [searchTerm]);

  function search(term: string) {
    const filters = filterBySection();

    orama
      .search({
        term,
        limit: 8,
        boost: {
          pageSectionTitle: 3,
          pageSectionContent: 2,
          pageTitle: 1,
        },
        facets: {
          siteSection: {},
        },
        ...filters,
      })
      .then(setSearchResults);
  }

  function changeFacet(idx: number) {
    setSelectedFacet(idx);
    search(searchTerm);
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
      <div className={styles.searchBoxModalPanel}>
        <div className={styles.searchBoxInnerPanel}>
          <div className={styles.searchBoxInputContainer}>
            <MagnifyingGlassIcon
              className={styles.searchBoxMagnifyingGlassIcon}
            />
            <input
              ref={searchInputRef}
              type="search"
              className={styles.searchBoxInput}
              onChange={event => setSearchTerm(event.target.value)}
              value={searchTerm}
            />
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
            {searchResults?.hits.map(hit => (
              <a
                key={hit.id}
                href={`/en/${hit.document.path}`}
                className={styles.fulltextSearchResult}
              >
                <div
                  className={styles.fulltextSearchResultTitle}
                  dangerouslySetInnerHTML={{
                    __html: highlighter
                      .highlight(hit.document.pageSectionTitle, searchTerm)
                      .trim(125),
                  }}
                />
                <div className={styles.fulltextSearchResultBreadcrumb}>
                  {pathToBreadcrumbs(hit.document.path).join(' > ')}
                  {' > '}
                  {hit.document.pageTitle}
                </div>
              </a>
            ))}

            {searchResults?.count && searchResults?.count > 8 && (
              <div className={styles.seeAllFulltextSearchResults}>
                <a
                  href={`/en/search?q=${searchTerm}&section=${selectedFacetName}`}
                >
                  See all {searchResults?.count.toLocaleString('en')} results
                </a>
              </div>
            )}
          </div>
          <div className={styles.poweredBy}>
            powered by
            <a
              href="https://oramasearch.com?utm_source=nodejs.org"
              target="_blank"
              rel="noreferer"
            >
              <img
                src="https://website-assets.oramasearch.com/light-orama-logo.svg"
                alt="Orama"
                className={styles.poweredByLogo}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

function pathToBreadcrumbs(path: string) {
  return path
    .replace(/#.+$/, '')
    .split('/')
    .slice(0, -1)
    .map(element => element.replaceAll('-', ' '))
    .filter(Boolean);
}

export const SearchButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', event => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        openSearchBox();
      }

      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    });
  }, []);

  function openSearchBox() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openSearchBox}
        className={styles.searchButton}
      >
        <MagnifyingGlassIcon className={styles.magnifyingGlassIcon} />
        Start typing...
      </button>
      {isOpen && <SearchBox />}
    </>
  );
};
