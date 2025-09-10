'use client';

import { SparklesIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import {
  MagnifyingGlassIcon,
  ArrowTurnDownLeftIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/solid';
import {
  SearchInput,
  FacetTabs,
  SearchResults,
  Suggestions,
} from '@orama/ui/components';
import { useSearchContext, useSearchDispatch } from '@orama/ui/contexts';
import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  useEffect,
  useRef,
  useCallback,
  type FC,
  type PropsWithChildren,
} from 'react';

import { DEFAULT_ORAMA_QUERY_PARAMS } from '#site/next.constants.mjs';

import { DocumentLink } from '../DocumentLink';
import styles from './index.module.css';
import { getFormattedPath } from './utils';

type SearchProps = PropsWithChildren<{
  onChatTrigger: () => void;
}>;

type Group = { name: string; count: number };

export const Search: FC<SearchProps> = ({ onChatTrigger }) => {
  const t = useTranslations();
  const { resolvedTheme } = useTheme();
  const { searchTerm, selectedFacet } = useSearchContext();
  const dispatch = useSearchDispatch();

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

  return (
    <>
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
                        'cursor-pointer rounded-lg p-3 text-sm transition-colors duration-200 focus-visible:outline-none',
                        isSelected && styles.facetTabItemSelected,
                        styles.facetTabItem
                      )}
                    >
                      {group.name}({group.count})
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
              <Image
                src={`https://website-assets.oramasearch.com/orama-when-${resolvedTheme}.svg`}
                alt="Powered by Orama"
                width="62"
                height="62"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
