'use client';

import { SparklesIcon } from '@heroicons/react/24/outline';
import { SearchResults, Suggestions } from '@orama/ui/components';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { useSearchbox } from '#site/providers/searchboxProvider';

import styles from './index.module.css';

export const EmptyResults: FC = () => {
  const t = useTranslations();
  const searchbox = useSearchbox();
  const isSearchMode = searchbox?.mode === 'search';

  return (
    <SearchResults.NoResults>
      {term => (
        <>
          {term ? (
            <div className={styles.noResultsWrapper}>
              <p>
                {t('components.search.noResultsFoundFor')} "{term}"
              </p>
            </div>
          ) : (
            <Suggestions.Wrapper className={styles.suggestionsWrapper}>
              <p className={styles.suggestionsTitle}>
                {t('components.search.suggestions')}
              </p>
              <Suggestions.Item
                onClick={() => searchbox?.switchTo('chat')}
                tabIndex={isSearchMode ? 0 : -1}
                aria-hidden={!isSearchMode}
                className={styles.suggestionItem}
              >
                <SparklesIcon />
                {t('components.search.suggestionOne')}
              </Suggestions.Item>
              <Suggestions.Item
                onClick={() => searchbox?.switchTo('chat')}
                tabIndex={isSearchMode ? 0 : -1}
                aria-hidden={!isSearchMode}
                className={styles.suggestionItem}
              >
                <SparklesIcon />
                {t('components.search.suggestionTwo')}
              </Suggestions.Item>
              <Suggestions.Item
                tabIndex={isSearchMode ? 0 : -1}
                aria-hidden={!isSearchMode}
                onClick={() => searchbox?.switchTo('chat')}
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
  );
};
