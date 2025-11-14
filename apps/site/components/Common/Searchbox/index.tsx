'use client';

import Search from '@node-core/ui-components/Common/Search';
import SearchModal from '@node-core/ui-components/Common/Search/Modal';
import { useTranslations } from 'next-intl';
import { useState, type FC } from 'react';

import { DEFAULT_ORAMA_QUERY_PARAMS } from '#site/next.constants.mjs';

import type { Document } from './DocumentLink';
import { Footer } from './Footer';
import { oramaClient } from './orama-client';
import { SearchItem } from './SearchItem';
import { SlidingChatPanel } from './SlidingChatPanel';

const Searchbox: FC = () => {
  const t = useTranslations();
  const [mode, setMode] = useState<'chat' | 'search'>('search');

  return (
    <SearchModal
      client={oramaClient}
      placeholder={t('components.search.searchPlaceholder')}
    >
      <Search
        input={{
          placeholder: t('components.search.searchPlaceholder'),
          ariaLabel: t('components.search.searchPlaceholder'),
        }}
        results={{
          suggestions: [
            t('components.search.suggestionOne'),
            t('components.search.suggestionTwo'),
            t('components.search.suggestionThree'),
          ],
          suggestionsTitle: t('components.search.suggestions'),
          noResultsTitle: t('components.search.noResultsFoundFor'),
          chatLabel: t('components.search.chatButtonLabel'),
          onChat: () => setMode('chat'),
          onHit: hit => (
            <SearchItem document={hit.document as Document} mode={mode} />
          ),
        }}
        tabIndex={mode === 'search' ? 0 : -1}
        aria-hidden={mode === 'chat'}
        searchParams={DEFAULT_ORAMA_QUERY_PARAMS}
      />
      <Footer />
      <SlidingChatPanel
        open={mode === 'chat'}
        onClose={() => setMode('search')}
      />
    </SearchModal>
  );
};

export default Searchbox;
