'use client';

import ChatTrigger from '@node-core/ui-components/Common/Search/Chat/Trigger';
import SearchModal from '@node-core/ui-components/Common/Search/Modal';
import SearchResults from '@node-core/ui-components/Common/Search/Results';
import SearchSuggestions from '@node-core/ui-components/Common/Search/Suggestions';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { FC } from 'react';

import { DEFAULT_ORAMA_QUERY_PARAMS } from '#site/next.constants.mjs';

import type { Document } from './DocumentLink';
import { Footer } from './Footer';
import styles from './index.module.css';
import { oramaClient } from './orama-client';
import { SearchItem } from './SearchItem';
import { SlidingChatPanel } from './SlidingChatPanel';

const Searchbox: FC = () => {
  const t = useTranslations();
  const [mode, setMode] = useState<'chat' | 'search'>('search');

  const sharedProps = {
    searchParams: DEFAULT_ORAMA_QUERY_PARAMS,
    tabIndex: mode === 'search' ? 0 : -1,
    'aria-hidden': mode === 'chat',
  };

  return (
    <SearchModal
      client={oramaClient}
      placeholder={t('components.search.searchPlaceholder')}
    >
      <div className={styles.searchResultsContainer}>
        <ChatTrigger onClick={() => setMode('chat')}>
          {t('components.search.chatButtonLabel')}
        </ChatTrigger>
        <SearchResults
          noResultsTitle={t('components.search.noResultsFoundFor')}
          onHit={hit => (
            <SearchItem document={hit.document as Document} mode={mode} />
          )}
          {...sharedProps}
        >
          <SearchSuggestions
            suggestions={[
              t('components.search.suggestionOne'),
              t('components.search.suggestionTwo'),
              t('components.search.suggestionThree'),
            ]}
            label={t('components.search.suggestions')}
          />
        </SearchResults>
      </div>
      <Footer />
      <SlidingChatPanel
        open={mode === 'chat'}
        onClose={() => setMode('search')}
      />
    </SearchModal>
  );
};

export default Searchbox;
