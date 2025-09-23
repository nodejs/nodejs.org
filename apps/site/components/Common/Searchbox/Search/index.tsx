'use client';

import { SparklesIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import {
  SearchInput,
  FacetTabs,
  SearchResults,
  Suggestions,
  SlidingPanel,
} from '@orama/ui/components';
import { useSearchContext } from '@orama/ui/contexts';
import { useSearch } from '@orama/ui/hooks/useSearch';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useEffect, useCallback, type FC, type PropsWithChildren } from 'react';

import { DEFAULT_ORAMA_QUERY_PARAMS } from '#site/next.constants.mjs';

import styles from './index.module.css';
import { getFormattedPath } from './utils';
import { DocumentLink } from '../DocumentLink';

type SearchProps = PropsWithChildren<{
  onChatTrigger: () => void;
}>;

export const Search: FC<SearchProps> = ({ onChatTrigger }) => {
  const t = useTranslations();
  const { searchTerm, selectedFacet } = useSearchContext();
  const { dispatch } = useSearch();

  const clearAll = useCallback(() => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: { searchTerm: '' } });
    dispatch({ type: 'SET_SELECTED_FACET', payload: { selectedFacet: 'All' } });
    dispatch({ type: 'SET_RESULTS', payload: { results: [] } });
  }, [dispatch]);

  useEffect(() => {
    clearAll();
    return () => {
      clearAll();
    };
  }, [clearAll]);

  return (
    <div className={styles.searchContainer}>
      <SearchInput.Wrapper className={styles.searchInputWrapper}>
        <MagnifyingGlassIcon />
        <SearchInput.Input
          inputId="doc-search"
          ariaLabel={t('components.search.searchPlaceholder')}
          placeholder={t('components.search.searchPlaceholder')}
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
        />
      </SearchInput.Wrapper>

      <div className={styles.searchResultsContainer}>
        <div className={styles.chatButtonWrapper}>
          <SlidingPanel.Trigger
            onClick={onChatTrigger}
            className={classNames(styles.chatButton, {
              [styles.chatButtonWithSearch]: searchTerm,
            })}
            initialPrompt={searchTerm || undefined}
            data-focus-on-arrow-nav
          >
            <SparklesIcon />
            <span>
              {searchTerm ? `${searchTerm} - ` : ''}
              {t('components.search.chatButtonLabel')}
            </span>
          </SlidingPanel.Trigger>
        </div>

        <div className={styles.searchResultsWrapper}>
          <SearchResults.Wrapper>
            <FacetTabs.Wrapper className={styles.facetTabsWrapper}>
              <FacetTabs.List className={styles.facetTabsList}>
                {(group, isSelected) => (
                  <>
                    <FacetTabs.Item
                      isSelected={group.name === selectedFacet}
                      group={group}
                      filterBy="siteSection"
                      searchParams={{
                        ...DEFAULT_ORAMA_QUERY_PARAMS,
                        term: searchTerm ?? '',
                      }}
                      className={classNames(
                        isSelected && styles.facetTabItemSelected,
                        styles.facetTabItem
                      )}
                    >
                      {group.name}
                      <span className={styles.facetTabItemCount}>
                        ({group.count})
                      </span>
                    </FacetTabs.Item>
                  </>
                )}
              </FacetTabs.List>
            </FacetTabs.Wrapper>

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
      </div>
    </div>
  );
};
