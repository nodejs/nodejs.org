'use client';

import type { Nullable, Results, Result } from '@orama/orama';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, type FC } from 'react';

import type { SearchDoc } from '@/components/SearchBox/components/SearchBox';
import { orama, highlighter } from '@/components/SearchBox/lib/orama';
import { pathToBreadcrumbs } from '@/components/SearchBox/lib/utils';
import { useBottomScrollListener } from '@/components/SearchPage/utils/useBottomScrollListener';
import { DEFAULT_ORAMA_QUERY_PARAMS } from '@/next.constants.mjs';

import styles from './index.module.css';

type SearchResults = Nullable<Results<SearchDoc>>;
type Hit = Result<SearchDoc>;

const SearchPage: FC = () => {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResults>(null);
  const [hits, setHits] = useState<Array<Hit>>([]);
  const [offset, setOffset] = useState<number>(0);

  const searchTerm = searchParams?.get('q');
  const searchSection = searchParams?.get('section');

  useBottomScrollListener(() => {
    setOffset(offset => offset + 10);
  });

  useEffect(() => {
    search(offset);
  }, [offset]);

  useEffect(() => {
    setHits([]);
    search(0);
  }, [searchSection, searchTerm]);

  const search = (resultsOffset = 0) => {
    orama
      .search({
        ...DEFAULT_ORAMA_QUERY_PARAMS,
        term: searchTerm || '',
        limit: 10,
        offset: resultsOffset,
        ...filterBySection(),
      })
      .then(results => {
        setSearchResults(results);
        setHits(hits => [...hits, ...results.hits]);
      })
      .catch(console.log);
  };

  const facets = {
    all: searchResults?.count ?? 0,
    ...(searchResults?.facets?.siteSection?.values ?? {}),
  };

  const filterBySection = () => {
    if (searchSection && searchSection !== 'all') {
      return {
        where: {
          siteSection: {
            eq: searchSection,
          },
        },
      };
    }

    return {};
  };

  return (
    <div className={styles.searchPageContainer}>
      <div className={styles.searchTermContainer}>
        <h1> {searchTerm} </h1>
      </div>

      <div className={styles.searchResultsColumns}>
        <div className={styles.facetsColumn}>
          {Object.keys(facets).map(facetName => (
            <Link
              key={facetName}
              className={styles.searchResultsFacet}
              href={`/en/search?q=${searchTerm}&section=${facetName}`}
            >
              {facetName}
              <span className={styles.facetCount}>
                ({facets[facetName as keyof typeof facets].toLocaleString('en')}
                )
              </span>
            </Link>
          ))}
        </div>

        <div className={styles.resultsColumn}>
          {hits?.map(hit => (
            <Link
              key={hit.id}
              href={hit.document.path}
              className={styles.searchResult}
            >
              <div>
                <h2 className={styles.searchResultTitle}>
                  {hit.document.pageSectionTitle}
                </h2>
                <p
                  className={styles.searchResultSnippet}
                  dangerouslySetInnerHTML={{
                    __html: highlighter
                      .highlight(hit.document.pageSectionContent, searchTerm!)
                      .trim(180),
                  }}
                />
                <div className={styles.searchResultPageTitle}>
                  Home {'>'} {pathToBreadcrumbs(hit.document.path).join(' > ')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
