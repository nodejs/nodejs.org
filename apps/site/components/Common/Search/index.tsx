'use client';

import { OramaSearchBox, OramaSearchButton } from '@orama/react-components';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { type FC } from 'react';

import {
  ORAMA_CLOUD_ENDPOINT,
  ORAMA_CLOUD_API_KEY,
  DEFAULT_ORAMA_QUERY_PARAMS,
  DEFAULT_ORAMA_SUGGESTIONS,
  BASE_URL,
} from '@/next.constants.mjs';

import { themeConfig } from './utils';

const SearchButton: FC = () => {
  const { resolvedTheme } = useTheme();
  const t = useTranslations();
  const colorScheme = resolvedTheme as 'light' | 'dark';

  const sourceMap = {
    title: 'pageSectionTitle',
    description: 'formattedPath',
    path: 'pageLink',
  };

  return (
    <>
      <OramaSearchButton
        style={{ flexGrow: 1 }}
        colorScheme={colorScheme}
        themeConfig={themeConfig}
        aria-label={t('components.search.searchBox.placeholder')}
      >
        {t('components.search.searchBox.placeholder')}
      </OramaSearchButton>

      <OramaSearchBox
        index={{ api_key: ORAMA_CLOUD_API_KEY, endpoint: ORAMA_CLOUD_ENDPOINT }}
        colorScheme={colorScheme}
        themeConfig={themeConfig}
        sourceBaseUrl={BASE_URL}
        sourcesMap={sourceMap}
        resultMap={{
          ...sourceMap,
          section: 'siteSection',
        }}
        facetProperty="siteSection"
        linksTarget="_self"
        highlight={{
          caseSensitive: false,
          HTMLTag: 'b',
          CSSClass: 'font-bold',
        }}
        searchParams={DEFAULT_ORAMA_QUERY_PARAMS}
        suggestions={DEFAULT_ORAMA_SUGGESTIONS}
      />
    </>
  );
};

export default SearchButton;
