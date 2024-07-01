'use client';

import type { Nullable, Results, Result } from '@orama/orama';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState, type FC } from 'react';

import { WithPoweredBy } from '@/components/Common/Search/States/WithPoweredBy';
import { WithSearchBox } from '@/components/Common/Search/States/WithSearchBox';
import { pathToBreadcrumbs } from '@/components/Common/Search/utils';
import Link from '@/components/Link';
import { useBottomScrollListener } from '@/hooks/react-client';
import { BASE_URL, DEFAULT_ORAMA_QUERY_PARAMS } from '@/next.constants.mjs';
import { search as oramaSearch, highlighter } from '@/next.orama.mjs';
import type { SearchDoc } from '@/types';

import styles from './index.module.css';

type SearchResults = Nullable<Results<SearchDoc>>;
type Hit = Result<SearchDoc>;

const SearchPage: FC = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResults>(null);
  const [hits, setHits] = useState<Array<Hit>>([]);
  const [offset, setOffset] = useState<number>(0);

  const searchTerm = searchParams?.get('q');
  const searchSection = searchParams?.get('section');
  const [shownSearchBox, setShownSearchbox] = useState<boolean>(!searchTerm);

  useBottomScrollListener(() => setOffset(offset => offset + 10));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => search(offset), [offset]);

  useEffect(() => {
    setHits([]);
    search(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchSection, searchTerm]);

  const uniqueHits = (newHits: Array<Hit>) =>
    newHits.filter(
      (obj, index) => newHits.findIndex(item => item.id === obj.id) === index
    );

  const search = (resultsOffset = 0) => {
    oramaSearch({
      ...DEFAULT_ORAMA_QUERY_PARAMS,
      mode: 'fulltext',
      term: searchTerm || '',
      limit: 10,
      offset: resultsOffset,
      ...filterBySection(),
    })
      .then(results => {
        setSearchResults(results);
        setHits(hits => uniqueHits([...hits, ...(results?.hits ?? [])]));
      })
      .catch();
  };

  const facets = {
    all: searchResults?.count ?? 0,
    ...(searchResults?.facets?.siteSection?.values ?? {}),
  };

  const filterBySection = () =>
    searchSection && searchSection !== 'all'
      ? { where: { siteSection: { eq: searchSection } } }
      : {};

  const getDocumentURL = (siteSection: string, path: string) => {
    const isAPIResult = siteSection.toLowerCase() === 'docs';
    const basePath = isAPIResult ? BASE_URL : '';
    return `${basePath}/${path}`;
  };

  return (
    <div className={styles.searchPageContainer}>
      {shownSearchBox ? (
        <WithSearchBox onClose={() => setShownSearchbox(false)} />
      ) : null}
      <div className={styles.searchTermContainer}>
        <h1>
          {t('components.search.searchPage.title', { query: searchTerm })}
        </h1>

        <WithPoweredBy />
      </div>

      <div className={styles.searchResultsColumns}>
        <div className={styles.facetsColumn}>
          {Object.keys(facets).map(facetName => (
            <Link
              key={facetName}
              className={styles.searchResultsFacet}
              href={`/search?q=${searchTerm}&section=${facetName}`}
            >
              {facetName}
              <span className={styles.facetCount}>
                ({facets[facetName as keyof typeof facets]})
              </span>
            </Link>
          ))}
        </div>

        <div className={styles.resultsColumn}>
          {hits?.map(hit => (
            <Link
              key={hit.id}
              className={styles.searchResult}
              href={getDocumentURL(
                hit.document.siteSection.toLowerCase(),
                hit.document.path
              )}
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
