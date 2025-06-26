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
import { useSearchContext } from '@orama/ui/context/SearchContext';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
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
  const { resolvedTheme } = useTheme();
  const t = useTranslations();
  const { searchTerm } = useSearchContext();

  const oramaLogo = `https://website-assets.oramasearch.com/orama-when-${resolvedTheme}.svg`;

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
          className={classNames(
            styles.chatButton,
            searchTerm ? styles.chatButtonWithSearch : ''
          )}
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
        <FacetTabs.Wrapper className={styles.facetTabsWrapper}>
          <FacetTabs.List className={styles.facetTabsList}>
            {(group, isSelected) => (
              <FacetTabs.Item
                isSelected={isSelected}
                group={group}
                filterBy="siteSection"
                className={classNames(
                  styles.facetTabItem,
                  isSelected ? styles.facetTabItemSelected : ''
                )}
              >
                {group.name}
                <span className={styles.facetTabItemCount}>{group.count}</span>
              </FacetTabs.Item>
            )}
          </FacetTabs.List>
        </FacetTabs.Wrapper>

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

        <SearchResults.GroupsWrapper
          className="relative items-start overflow-y-auto"
          groupBy="siteSection"
        >
          {group => (
            <div key={group.name} className={styles.searchResultsGroup}>
              <h2 className={styles.searchResultsGroupTitle}>{group.name}</h2>
              <SearchResults.GroupList group={group}>
                {hit => (
                  <SearchResults.Item className={styles.searchResultsItem}>
                    <Link
                      data-focus-on-arrow-nav
                      href={
                        (hit.document.siteSection as string).toLowerCase() ===
                        'docs'
                          ? `/${hit.document.path}`
                          : `/${locale}/${hit.document.path}`
                      }
                    >
                      <DocumentTextIcon />
                      <div>
                        {typeof hit.document?.pageSectionTitle === 'string' && (
                          <h3 className={styles.searchResultsItemTitle}>
                            {hit.document?.pageSectionTitle}
                          </h3>
                        )}
                        {typeof hit.document?.pageSectionTitle === 'string' &&
                          typeof hit.document?.path === 'string' && (
                            <p className={styles.searchResultsItemDescription}>
                              {getFormattedPath(
                                hit.document?.path,
                                hit.document?.pageSectionTitle
                              )}
                            </p>
                          )}
                      </div>
                    </Link>
                  </SearchResults.Item>
                )}
              </SearchResults.GroupList>
            </div>
          )}
        </SearchResults.GroupsWrapper>
      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        <div className={styles.shortcutWrapper}>
          <div className={styles.shortcutItem}>
            <kbd className={styles.shortcutKey}>
              <ArrowTurnDownLeftIcon />
            </kbd>
            <span className={styles.shortcutLabel}>to select</span>
          </div>
          <div className={styles.shortcutItem}>
            <kbd className={styles.shortcutKey}>
              <ArrowDownIcon />
            </kbd>
            <kbd className={styles.shortcutKey}>
              <ArrowUpIcon />
            </kbd>
            <span className={styles.shortcutLabel}>to navigate</span>
          </div>
          <div className={styles.shortcutItem}>
            <kbd className={styles.shortcutKey}>esc</kbd>
            <span className={styles.shortcutLabel}>to close</span>
          </div>
        </div>
        <div>
          <a
            href="https://www.orama.com/?utm_source=nodejs.org&amp;utm_medium=powered-by"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.poweredByLink}
            data-focus-on-arrow-nav
          >
            <small>Powered by</small>
            <Image
              src={oramaLogo}
              alt={t('components.search.poweredBy', { provider: 'Orama' })}
              width="62"
              height={22}
            />
          </a>
        </div>
      </div>
    </>
  );
};
