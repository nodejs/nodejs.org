'use client';

import { SparklesIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import FacetTabs from '@orama/ui/components/FacetTabs';
import SearchInput from '@orama/ui/components/SearchInput';
import SearchResults from '@orama/ui/components/SearchResults';
import Suggestions from '@orama/ui/components/Suggestions';
import classNames from 'classnames';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { type FC, type PropsWithChildren } from 'react';

import styles from './index.module.css';

type SearchProps = PropsWithChildren & {
  onChatTrigger: () => void;
};

const uppercaseFirst = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const getFormattedPath = (path: string, title: string) =>
  `${path
    .replace(/#.+$/, '')
    .split('/')
    .map(element => element.replaceAll('-', ' '))
    .map(element => uppercaseFirst(element))
    .filter(Boolean)
    .join(' > ')} — ${title}`;

export const Search: FC<SearchProps> = ({ onChatTrigger }) => {
  const locale = useLocale();
  const t = useTranslations();

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
            groupBy: 'siteSection',
          }}
        />
      </SearchInput.Wrapper>

      <div className={styles.chatButtonWrapper}>
        <button
          type="button"
          onClick={onChatTrigger}
          className={classNames(styles.chatButton)}
        >
          <SparklesIcon className="h-4 w-4" />
          <span className="text-sm">
            {t('components.search.chatButtonLabel')}
          </span>
        </button>
      </div>

      <div className={styles.searchResultsWrapper}>
        <FacetTabs.Wrapper>
          <FacetTabs.List className="flex gap-1 space-x-2">
            {(group, isSelected) => (
              <FacetTabs.Item
                isSelected={isSelected}
                group={group}
                className={classNames(
                  'cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isSelected
                    ? 'bg-pink-100 text-pink-800 dark:bg-pink-700 dark:text-pink-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {group.name} ({group.count})
              </FacetTabs.Item>
            )}
          </FacetTabs.List>
        </FacetTabs.Wrapper>

        <SearchResults.NoResults>
          {searchTerm => (
            <>
              {searchTerm ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {`No results found for "${searchTerm}". Please try a different search term.`}
                </p>
              ) : (
                <Suggestions.Wrapper className={styles.suggestionsWrapper}>
                  <p className={styles.suggestionsTitle}>Suggestions</p>
                  <Suggestions.List className="mt-1 space-y-1">
                    <Suggestions.Item
                      onClick={onChatTrigger}
                      itemClassName={styles.suggestionItem}
                    >
                      <SparklesIcon className="h-4 w-4" />
                      How to install Node.js?
                    </Suggestions.Item>
                    <Suggestions.Item
                      onClick={onChatTrigger}
                      itemClassName={styles.suggestionItem}
                    >
                      <SparklesIcon className="h-4 w-4" />
                      How to create an HTTP server?
                    </Suggestions.Item>
                    <Suggestions.Item
                      onClick={onChatTrigger}
                      itemClassName={styles.suggestionItem}
                    >
                      <SparklesIcon className="h-4 w-4" />
                      Upgrading Node.js version
                    </Suggestions.Item>
                  </Suggestions.List>
                </Suggestions.Wrapper>
              )}
            </>
          )}
        </SearchResults.NoResults>

        <div>
          <SearchResults.GroupsWrapper
            className="relative items-start overflow-y-auto"
            groupBy="siteSection"
          >
            {group => (
              <div key={group.name} className="mb-4">
                <h2 className="text-md mb-3 mt-3 font-semibold uppercase text-gray-400 dark:text-slate-200">
                  {group.name}
                </h2>
                <SearchResults.GroupList group={group}>
                  {hit => (
                    <SearchResults.Item className="border-b-1 block cursor-pointer border-gray-200 bg-white px-3 py-4 duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:hover:bg-gray-700">
                      <Link
                        href={
                          (hit.document.siteSection as string).toLowerCase() ===
                          'docs'
                            ? `/${hit.document.path}`
                            : `/${locale}/${hit.document.path}`
                        }
                      >
                        {typeof hit.document?.pageSectionTitle === 'string' && (
                          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                            {hit.document?.pageSectionTitle}
                          </h3>
                        )}
                        {typeof hit.document?.pageSectionTitle === 'string' &&
                          typeof hit.document?.path === 'string' && (
                            <p className="overflow-hidden text-ellipsis text-sm text-slate-600 dark:text-slate-400">
                              {getFormattedPath(
                                hit.document?.path,
                                hit.document?.pageSectionTitle
                              )}
                            </p>
                          )}
                      </Link>
                    </SearchResults.Item>
                  )}
                </SearchResults.GroupList>
              </div>
            )}
          </SearchResults.GroupsWrapper>
        </div>
      </div>
    </>
  );
};
