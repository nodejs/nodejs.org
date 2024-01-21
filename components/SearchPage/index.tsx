'use client';

import Link from 'next/link';
import type { Nullable, Results } from '@orama/orama';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, type FC } from 'react';

import type { SearchDoc } from '@/components/SearchBox/components/SearchBox';
import { orama } from '@/components/SearchBox/lib/orama';

import styles from './index.module.css';

type SearchResults = Nullable<Results<SearchDoc>>;

const SearchPage: FC = () => {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResults>(null);
  const [selectedFacet, setSelectedFacet] = useState<number>(0);

  const searchTerm = searchParams?.get('q');
  const searchSection = searchParams?.get('section');

  useEffect(() => {
    orama
      .search({
        term: searchTerm || '',
        mode: 'hybrid',
        facets: {
          siteSection: {},
        },
        ...filterBySection(),
      })
      .then(setSearchResults)
      .catch(console.log);
  }, []);

  const facets = {
    all: searchResults?.count ?? 0,
    ...(searchResults?.facets?.siteSection?.values ?? {}),
  };

  const selectedFacetName = Object.keys(facets)[selectedFacet];

  function filterBySection() {
    if (!searchSection || searchSection === 'all') {
      return {};
    }

    return {
      where: {
        siteSection: {
          eq: searchSection,
        },
      },
    };
  }

  function changeFacet(idx: number) {
    setSelectedFacet(idx);
  }

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
      </div>
    </div>
  );
};

export default SearchPage;
