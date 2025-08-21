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
  OramaLogo,
  OramaIcon,
} from '@orama/ui/components';
import { useSearchContext } from '@orama/ui/contexts';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useMemo, type FC, type PropsWithChildren } from 'react';

import { DocumentLink } from '../DocumentLink';
import styles from './index.module.css';
import { getFormattedPath } from './utils';

type SearchProps = PropsWithChildren<{
  onChatTrigger: () => void;
}>;

export const Search: FC<SearchProps> = ({ onChatTrigger }) => {
  const t = useTranslations();
  const { searchTerm, groupsCount, results } = useSearchContext();

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
        totalCount++;
      }
    });

    const groups = [{ name: 'All', count: totalCount }];

    Array.from(sectionCounts.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([siteSection, count]) => {
        groups.push({ name: siteSection, count: count });
      });

    return groups;
  }, [results, groupsCount]);

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
          {generatedGroupsCount.length > 1 && (
            <div className={styles.facetTabsWrapper}>
              <ul
                className={classNames(
                  styles.facetTabsList,
                  'flex gap-1 space-x-2'
                )}
              >
                {generatedGroupsCount.map(
                  (group: { name: string; count: number }) => (
                    <li key={group.name}>
                      <FacetTabs.Item
                        isSelected={group.name === 'All'}
                        group={group}
                        filterBy="siteSection"
                        className={classNames(
                          'cursor-pointer rounded-lg p-3 text-sm transition-colors duration-200',
                          group.name === 'All'
                            ? 'border-green-600 bg-green-600 text-white'
                            : 'border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700',
                          styles.facetTabItem
                        )}
                      >
                        {group.name} ({group.count})
                      </FacetTabs.Item>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          <SearchResults.NoResults>
            {searchTerm => (
              <>
                {searchTerm ? (
                  <div className={styles.noResultsWrapper}>
                    <p className={styles.noResultsText}>
                      {t('components.search.noResultsFoundFor')} "{searchTerm}"
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
                  {group.name} ({group.count})
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
                          {typeof hit.document?.pageSectionTitle === 'string' &&
                            typeof hit.document?.path === 'string' && (
                              <p
                                className={styles.searchResultsItemDescription}
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
            <OramaIcon width={16} height={16} theme="dark" />
            <OramaLogo theme="dark" width={52} />
          </a>
        </div>
      </div>
    </>
  );
};
