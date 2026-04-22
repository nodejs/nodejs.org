'use client';

import SearchBox from '@node-core/ui-components/Common/Search';
import { useTranslations } from 'next-intl';

import type { FC } from 'react';

const WithSearch: FC = () => {
  const t = useTranslations();

  return (
    <SearchBox
      closeShortcutLabel={t('components.search.keyboardShortcuts.close')}
      navigateShortcutLabel={t('components.search.keyboardShortcuts.navigate')}
      noResultsTitle={t('components.search.noResultsFoundFor')}
      path="/orama-db.json"
      placeholder={t('components.search.searchPlaceholder')}
      selectShortcutLabel={t('components.search.keyboardShortcuts.select')}
    />
  );
};

export default WithSearch;
