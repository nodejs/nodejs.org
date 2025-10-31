'use client';

import { SparklesIcon } from '@heroicons/react/24/outline';
import { FacetTabs, SearchResults, SlidingPanel } from '@orama/ui/components';
import { useSearch } from '@orama/ui/hooks/useSearch';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { DEFAULT_ORAMA_QUERY_PARAMS } from '#site/next.constants.mjs';
import { useSearchbox } from '#site/providers/searchboxProvider';

import styles from './index.module.css';
import type { Document } from '../DocumentLink';
import { EmptyResults } from '../EmptyResults';
import { SearchItem } from '../SearchItem';

export const SearchResultsWrapper: FC = () => {
  const t = useTranslations();
  const {
    context: { searchTerm, selectedFacet },
  } = useSearch();
  const searchbox = useSearchbox();
  const isSearchMode = searchbox?.mode === 'search';

  return (
    <div className={styles.searchResultsContainer}>
      <div className={styles.chatButtonWrapper}>
        <SlidingPanel.Trigger
          onClick={() => searchbox?.switchTo('chat')}
          className={classNames(styles.chatButton, {
            [styles.chatButtonWithSearch]: searchTerm,
          })}
          tabIndex={isSearchMode ? 0 : -1}
          aria-hidden={!isSearchMode}
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
                    tabIndex={isSearchMode ? 0 : -1}
                    aria-hidden={!isSearchMode}
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

          <SearchResults.Loading>
            <div className={styles.skeletonWrapper}>
              {[...Array(3)].map((_, index) => (
                <div key={index} className={styles.skeletonItem}>
                  <div
                    className={classNames(
                      styles.skeletonAnim,
                      styles.skeletonAvatar
                    )}
                  />
                  <div className={styles.skeletonText}>
                    <div
                      className={classNames(
                        styles.skeletonAnim,
                        styles.skeletonLineShort
                      )}
                    />
                    <div
                      className={classNames(
                        styles.skeletonAnim,
                        styles.skeletonLineLong
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SearchResults.Loading>

          <EmptyResults />

          <SearchResults.GroupsWrapper
            className={styles.searchResultsGroupWrapper}
            groupBy="siteSection"
          >
            {group => (
              <div key={group.name} className={styles.searchResultsGroup}>
                <h2 className={styles.searchResultsGroupTitle}>{group.name}</h2>
                <SearchResults.GroupList group={group}>
                  {hit => <SearchItem document={hit.document as Document} />}
                </SearchResults.GroupList>
              </div>
            )}
          </SearchResults.GroupsWrapper>
        </SearchResults.Wrapper>
      </div>
    </div>
  );
};
