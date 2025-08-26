'use client';

import { SparklesIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import {
  MagnifyingGlassIcon,
  ArrowTurnDownLeftIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/solid';
import type { Hit, SearchParams } from '@orama/core';
import {
  SearchInput,
  FacetTabs,
  SearchResults,
  Suggestions,
} from '@orama/ui/components';
import { useSearchContext, useSearchDispatch } from '@orama/ui/contexts';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
  type FC,
  type PropsWithChildren,
} from 'react';

import { DocumentLink } from '../DocumentLink';
import styles from './index.module.css';
import { getFormattedPath } from './utils';

type SearchProps = PropsWithChildren<{
  onChatTrigger: () => void;
}>;

type CloudParams = Omit<SearchParams, 'indexes'> & {
  datasources: Array<string>;
};

type CloudSearchResponse = {
  hits?: Array<Hit>;
  count?: number;
  facets?: { siteSection?: { values?: Record<string, number> } };
  aggregations?: { siteSection?: { values?: Record<string, number> } };
};

type Group = { name: string; count: number };

export const Search: FC<SearchProps> = ({ onChatTrigger }) => {
  const t = useTranslations();
  const { client, searchTerm, groupsCount, results, selectedFacet } =
    useSearchContext();
  const dispatch = useSearchDispatch();

  const [facetsEverShown, setFacetsEverShown] = useState<boolean>(false);

  const defaultFacetsRef = useRef<Record<string, unknown>>({
    siteSection: {},
  });

  const dataSourcesRef = useRef<Array<string>>([
    process.env.NEXT_PUBLIC_ORAMA_DATASOURCE_ID || '',
  ]);

  const lastIssuedSigRef = useRef<string>('');

  const baselineGroupsRef = useRef<Array<Group> | null>(null);

  const clearAll = useCallback(() => {
    lastIssuedSigRef.current = '';
    baselineGroupsRef.current = null;

    dispatch({ type: 'SET_SEARCH_TERM', payload: { searchTerm: '' } });
    dispatch({ type: 'SET_SELECTED_FACET', payload: { selectedFacet: 'All' } });
    dispatch({ type: 'SET_RESULTS', payload: { results: [] } });
    dispatch({ type: 'SET_GROUPS_COUNT', payload: { groupsCount: null } });
    dispatch({ type: 'SET_COUNT', payload: { count: 0 } });
  }, [dispatch]);

  useEffect(() => {
    clearAll();
    return () => {
      clearAll();
    };
  }, [clearAll]);

  useEffect(() => {
    baselineGroupsRef.current = null;
  }, [searchTerm]);

  useEffect(() => {
    if (!client) return;

    const term = searchTerm ?? '';
    const facet = selectedFacet ?? null;

    if (term.trim() === '') return;

    const sig = `${term}|||${facet ?? ''}`;
    if (lastIssuedSigRef.current === sig) return;
    lastIssuedSigRef.current = sig;

    const id = window.setTimeout(async () => {
      const where: SearchParams['where'] | undefined =
        facet && facet !== 'All' ? { siteSection: facet } : undefined;

      const params: CloudParams = {
        term: term,
        limit: 10,
        boost: {},
        facets: defaultFacetsRef.current,
        datasources: dataSourcesRef.current,
        ...(where ? { where } : {}),
      };

      (params as Record<string, unknown>).groupBy = { property: 'siteSection' };

      const raw = await client.search(params);
      const res = raw as unknown as CloudSearchResponse;

      dispatch({
        type: 'SET_RESULTS',
        payload: { results: res.hits ?? [] },
      });
      dispatch({
        type: 'SET_COUNT',
        payload: { count: res.count ?? 0 },
      });

      const siteFacetValues: Record<string, number> | undefined =
        res.facets?.siteSection?.values ??
        res.aggregations?.siteSection?.values;

      if (siteFacetValues) {
        const entries = Object.entries(siteFacetValues);
        const derivedGroups: Array<Group> = [
          { name: 'All', count: res.count ?? 0 },
          ...entries
            .map(([name, c]) => {
              const count = Number(c);
              return { name, count };
            })
            .sort((a, b) => a.name.localeCompare(b.name)),
        ];

        if (!facet || facet === 'All') {
          baselineGroupsRef.current = derivedGroups;
          dispatch({
            type: 'SET_GROUPS_COUNT',
            payload: { groupsCount: derivedGroups },
          });
        } else {
          const toShow = baselineGroupsRef.current ?? derivedGroups;
          dispatch({
            type: 'SET_GROUPS_COUNT',
            payload: { groupsCount: toShow },
          });
        }
      } else {
        if (facet && facet !== 'All' && baselineGroupsRef.current) {
          dispatch({
            type: 'SET_GROUPS_COUNT',
            payload: { groupsCount: baselineGroupsRef.current },
          });
        }
      }
    }, 120);

    return () => window.clearTimeout(id);
  }, [client, searchTerm, selectedFacet, dispatch]);

  const generatedGroupsCount = useMemo(() => {
    if (!results || results.length === 0) {
      return groupsCount || [];
    }

    const sectionCounts = new Map<string, number>();
    let totalCount = 0;

    results.forEach(result => {
      const siteSection = result.document?.siteSection;
      if (siteSection && typeof siteSection === 'string') {
        sectionCounts.set(
          siteSection,
          (sectionCounts.get(siteSection) || 0) + 1
        );
        totalCount += 1;
      }
    });

    const groups: Array<Group> = [{ name: 'All', count: totalCount }];

    Array.from(sectionCounts.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([siteSection, count]) => {
        groups.push({ name: siteSection, count: count });
      });

    return groups;
  }, [results, groupsCount]);

  const [allKnownFacets, setAllKnownFacets] = useState<Set<string>>(new Set());

  const displayFacetsList = useMemo(() => {
    if (!facetsEverShown) return generatedGroupsCount;

    const currentCounts = new Map<string, number>();
    let totalCount = 0;

    generatedGroupsCount.forEach((group: { name: string; count: number }) => {
      currentCounts.set(group.name, group.count);
      if (group.name !== 'All') {
        totalCount += group.count;
      } else {
        totalCount = group.count;
      }
    });

    const displayList: Array<{ name: string; count: number }> = [
      { name: 'All', count: totalCount },
    ];

    Array.from(allKnownFacets)
      .filter(facetName => facetName !== 'All')
      .sort()
      .forEach(facetName => {
        displayList.push({
          name: facetName,
          count: currentCounts.get(facetName) ?? 0,
        });
      });

    return displayList;
  }, [generatedGroupsCount, allKnownFacets, facetsEverShown]);

  useEffect(() => {
    if (generatedGroupsCount.length > 1) {
      setFacetsEverShown(true);

      const newKnownFacets = new Set(allKnownFacets);
      generatedGroupsCount.forEach((group: { name: string }) => {
        newKnownFacets.add(group.name);
      });

      if (newKnownFacets.size > allKnownFacets.size) {
        setAllKnownFacets(newKnownFacets);
      }
    }
  }, [generatedGroupsCount, allKnownFacets]);

  useEffect(() => {
    if (searchTerm) {
      setAllKnownFacets(new Set());
    }
  }, [searchTerm]);

  return (
    <>
      <SearchInput.Wrapper className={styles.searchInputWrapper}>
        <MagnifyingGlassIcon />
        <SearchInput.Input
          inputId="doc-search"
          ariaLabel={t('components.search.searchPlaceholder')}
          placeholder={t('components.search.searchPlaceholder')}
          className={styles.searchInput}
        />
      </SearchInput.Wrapper>

      <div className={styles.searchPanelContainer}>
        <div className={styles.chatButtonWrapper}>
          <button
            type="button"
            onClick={onChatTrigger}
            className={classNames(styles.chatButton, {
              [styles.chatButtonWithSearch]: searchTerm,
            })}
            data-focus-on-arrow-nav
          >
            <SparklesIcon />
            <span>
              {searchTerm ? `${searchTerm} - ` : ''}
              {t('components.search.chatButtonLabel')}
            </span>
          </button>
        </div>

        <div className={styles.searchResultsWrapper}>
          <SearchResults.Wrapper>
            {facetsEverShown && displayFacetsList.length > 1 && (
              <div className={styles.facetTabsWrapper}>
                <ul
                  className={classNames(
                    styles.facetTabsList,
                    'flex gap-1 space-x-2'
                  )}
                >
                  <FacetTabs.Wrapper>
                    <FacetTabs.List className="mt-4 flex gap-1 space-x-2">
                      {(group, isSelected) => (
                        <FacetTabs.Item
                          isSelected={isSelected}
                          group={group}
                          filterBy="siteSection"
                          searchParams={{
                            boost: {},
                            term: searchTerm ?? '',
                            facets: defaultFacetsRef.current,
                          }}
                          className={classNames(
                            'cursor-pointer rounded-lg border p-3 text-sm transition-colors duration-200 focus-visible:outline-none',
                            isSelected
                              ? 'border-[#84ba64] bg-[rgba(132,186,100,0.06)]'
                              : 'border-transparent',
                            styles.facetTabItem
                          )}
                        >
                          {group.name}({group.count})
                        </FacetTabs.Item>
                      )}
                    </FacetTabs.List>
                  </FacetTabs.Wrapper>
                </ul>
              </div>
            )}

            <SearchResults.NoResults>
              {term => (
                <>
                  {term ? (
                    <div className={styles.noResultsWrapper}>
                      <p className={styles.noResultsText}>
                        {t('components.search.noResultsFoundFor')} "{term}"
                      </p>
                    </div>
                  ) : (
                    <Suggestions.Wrapper className={styles.suggestionsWrapper}>
                      <p className={styles.suggestionsTitle}>
                        {t('components.search.suggestions')}
                      </p>
                      <Suggestions.Item
                        onClick={onChatTrigger}
                        className={styles.suggestionItem}
                      >
                        <SparklesIcon />
                        {t('components.search.suggestionOne')}
                      </Suggestions.Item>
                      <Suggestions.Item
                        onClick={onChatTrigger}
                        className={styles.suggestionItem}
                      >
                        <SparklesIcon />
                        {t('components.search.suggestionTwo')}
                      </Suggestions.Item>
                      <Suggestions.Item
                        onClick={onChatTrigger}
                        className={styles.suggestionItem}
                      >
                        <SparklesIcon />
                        {t('components.search.suggestionThree')}
                      </Suggestions.Item>
                    </Suggestions.Wrapper>
                  )}
                </>
              )}
            </SearchResults.NoResults>

            <SearchResults.GroupsWrapper
              className="relative items-start overflow-y-auto"
              groupBy="siteSection"
            >
              {group => (
                <div key={group.name} className={styles.searchResultsGroup}>
                  {/* header without counts */}
                  <h2 className={styles.searchResultsGroupTitle}>
                    {group.name}
                  </h2>
                  <SearchResults.GroupList group={group}>
                    {hit => (
                      <SearchResults.Item className={styles.searchResultsItem}>
                        <DocumentLink
                          document={
                            hit.document as {
                              path: string;
                              siteSection: string;
                              pageSectionTitle?: string;
                            }
                          }
                          data-focus-on-arrow-nav
                        >
                          <DocumentTextIcon />
                          <div>
                            {typeof hit.document?.pageSectionTitle ===
                              'string' && (
                              <h3 className={styles.searchResultsItemTitle}>
                                {hit.document?.pageSectionTitle}
                              </h3>
                            )}
                            {typeof hit.document?.pageSectionTitle ===
                              'string' &&
                              typeof hit.document?.path === 'string' && (
                                <p
                                  className={
                                    styles.searchResultsItemDescription
                                  }
                                >
                                  {getFormattedPath(
                                    hit.document?.path,
                                    hit.document?.pageSectionTitle
                                  )}
                                </p>
                              )}
                          </div>
                        </DocumentLink>
                      </SearchResults.Item>
                    )}
                  </SearchResults.GroupList>
                </div>
              )}
            </SearchResults.GroupsWrapper>
          </SearchResults.Wrapper>
        </div>

        <div className={styles.footer}>
          <div className={styles.shortcutWrapper}>
            <div className={styles.shortcutItem}>
              <kbd className={styles.shortcutKey}>
                <ArrowTurnDownLeftIcon />
              </kbd>
              <span className={styles.shortcutLabel}>
                {t('components.search.keyboardShortcuts.select')}
              </span>
            </div>
            <div className={styles.shortcutItem}>
              <kbd className={styles.shortcutKey}>
                <ArrowDownIcon />
              </kbd>
              <kbd className={styles.shortcutKey}>
                <ArrowUpIcon />
              </kbd>
              <span className={styles.shortcutLabel}>
                {t('components.search.keyboardShortcuts.navigate')}
              </span>
            </div>
            <div className={styles.shortcutItem}>
              <kbd className={styles.shortcutKey}>esc</kbd>
              <span className={styles.shortcutLabel}>
                {t('components.search.keyboardShortcuts.close')}
              </span>
            </div>
          </div>
          <div>
            <a
              href="https://www.orama.com/?utm_source=nodejs.org&utm_medium=powered-by"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.poweredByLink}
              data-focus-on-arrow-nav
            >
              <small>{t('components.search.poweredBy')}</small>
              <img
                src="https://website-assets.oramasearch.com/orama-when-dark.svg"
                alt="Powered by Orama"
                width="62"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
