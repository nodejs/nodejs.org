import { SearchResults } from '@orama/ui/components';
import { useSearch } from '@orama/ui/hooks/useSearch';

import SearchResultsEmpty from '#ui/Common/Search/Results/Empty';
import SearchResultsSkeleton from '#ui/Common/Search/Results/Skeleton';
import Tabs from '#ui/Common/Search/Results/Tabs';

import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

type SearchResultsWrapperProps = {
  onHit: ComponentProps<typeof SearchResults.GroupList>['children'];
  noResultsTitle: string;
} & Omit<ComponentProps<typeof SearchResultsEmpty>, 'label'>;

const SearchResultsWrapper: FC<SearchResultsWrapperProps> = ({
  onHit,
  noResultsTitle,
  ...props
}) => {
  const {
    context: { searchTerm, selectedFacet },
  } = useSearch();

  return (
    <div className={styles.searchResultsWrapper}>
      <SearchResults.Wrapper>
        <Tabs
          {...props}
          searchParams={{
            term: searchTerm ?? '',
            limit: 25,
            threshold: 0,
            boost: {
              pageSectionTitle: 4,
              pageSectionContent: 2.5,
              pageTitle: 1.5,
            },
          }}
          selectedFacet={selectedFacet}
        />
        <SearchResultsSkeleton />
        <SearchResultsEmpty label={noResultsTitle} {...props} />

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
  );
};

export default SearchResultsWrapper;
