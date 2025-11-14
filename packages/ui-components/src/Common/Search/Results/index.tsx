'use client';

import { SparklesIcon } from '@heroicons/react/24/outline';
import { SearchResults, SlidingPanel } from '@orama/ui/components';
import { useSearch } from '@orama/ui/hooks/useSearch';
import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import SearchResultsEmpty from './Empty';
import styles from './index.module.css';
import SearchResultsSkeleton from './Skeleton';
import Tabs from './Tabs';

type SearchResultsWrapperProps = {
  chatLabel?: string;
  onChat: () => void;
  searchParams: Omit<ComponentProps<typeof Tabs>['searchParams'], 'term'>;
  onHit: ComponentProps<typeof SearchResults.GroupList>['children'];
} & ComponentProps<typeof SearchResultsEmpty>;

const SearchResultsWrapper: FC<SearchResultsWrapperProps> = ({
  onChat,
  chatLabel,
  searchParams,
  onHit,
  suggestionsTitle,
  suggestions,
  noResultsTitle,
  ...props
}) => {
  const {
    context: { searchTerm, selectedFacet },
  } = useSearch();

  return (
    <div className={styles.searchResultsContainer}>
      {chatLabel && (
        <div className={styles.chatButtonWrapper}>
          <SlidingPanel.Trigger
            onClick={onChat}
            className={classNames(styles.chatButton, {
              [styles.chatButtonWithSearch]: searchTerm,
            })}
            initialPrompt={searchTerm || undefined}
            data-focus-on-arrow-nav
            {...props}
          >
            <SparklesIcon />
            <span>
              {searchTerm ? `${searchTerm} - ` : ''}
              {chatLabel}
            </span>
          </SlidingPanel.Trigger>
        </div>
      )}

      <div className={styles.searchResultsWrapper}>
        <SearchResults.Wrapper>
          <Tabs
            {...props}
            searchParams={{ ...searchParams, term: searchTerm ?? '' }}
            selectedFacet={selectedFacet}
          />
          <SearchResultsSkeleton />
          <SearchResultsEmpty
            suggestionsTitle={suggestionsTitle}
            suggestions={suggestions}
            noResultsTitle={noResultsTitle}
            {...props}
          />

          <SearchResults.GroupsWrapper
            className={styles.searchResultsGroupWrapper}
            groupBy="siteSection"
          >
            {group => (
              <div key={group.name} className={styles.searchResultsGroup}>
                <h2 className={styles.searchResultsGroupTitle}>{group.name}</h2>
                <SearchResults.GroupList group={group}>
                  {onHit}
                </SearchResults.GroupList>
              </div>
            )}
          </SearchResults.GroupsWrapper>
        </SearchResults.Wrapper>
      </div>
    </div>
  );
};

export default SearchResultsWrapper;
