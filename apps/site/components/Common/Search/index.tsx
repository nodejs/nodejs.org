'use client';

import { OramaSearchBox, OramaSearchButton } from '@orama/react-components';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

import { useRouter } from '@/navigation.mjs';
import {
  ORAMA_CLOUD_ENDPOINT,
  ORAMA_CLOUD_API_KEY,
  DEFAULT_ORAMA_QUERY_PARAMS,
  DEFAULT_ORAMA_SUGGESTIONS,
  BASE_URL,
} from '@/next.constants.mjs';

type ResultMapDescription = {
  path: string;
  pageSectionTitle: string;
};

type ResultMapPath = { path: string; siteSection: string };

import { themeConfig } from './utils';

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

const SearchButton: FC = () => {
  const { resolvedTheme } = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const colorScheme = resolvedTheme as 'light' | 'dark';
  const router = useRouter();

  const sourceMap = {
    title: 'pageSectionTitle',
    description: 'formattedPath',
    path: 'path',
  };

  const resultMap = {
    ...sourceMap,
    description: ({ path, pageSectionTitle }: ResultMapDescription) =>
      getFormattedPath(path, pageSectionTitle),
    path: ({ path, siteSection }: ResultMapPath) =>
      siteSection.toLowerCase() === 'docs' ? `/${path}` : `/${locale}/${path}`,
    section: 'siteSection',
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
        resultMap={resultMap}
        facetProperty="siteSection"
        linksTarget="_self"
        highlightTitle={{
          caseSensitive: false,
          HTMLTag: 'b',
          CSSClass: 'font-bold',
        }}
        searchParams={DEFAULT_ORAMA_QUERY_PARAMS}
        suggestions={DEFAULT_ORAMA_SUGGESTIONS}
        chatMarkdownLinkHref={({ href }) => {
          if (!href) {
            return href;
          }

          const baseURLObject = new URL(BASE_URL);
          const baseURLHostName = baseURLObject.hostname;

          const searchBoxURLObject = new URL(href);
          const searchBoxURLHostName = searchBoxURLObject.hostname;
          const serachBoxURLPathName = searchBoxURLObject.pathname;

          // We do not want to add the locale to the url for external links and docs links
          if (
            baseURLHostName !== searchBoxURLHostName ||
            serachBoxURLPathName.startsWith('/docs/')
          ) {
            return href;
          }

          const URLWithLocale = new URL(
            `${locale}${searchBoxURLObject.pathname}`,
            searchBoxURLObject.origin
          );

          return URLWithLocale.href;
        }}
        onAnswerSourceClick={event => {
          event.preventDefault();

          const baseURLObject = new URL(BASE_URL);

          const { path } = event.detail.source;

          const finalPath = path.startsWith('docs/')
            ? path
            : `${locale}/${path}`;

          const finalURL = new URL(finalPath, baseURLObject);

          window.open(finalURL, '_blank');
        }}
        onSearchResultClick={event => {
          event.preventDefault();

          const fullURLObject = new URL(event.detail.result.path, BASE_URL);

          // result.path already contains LOCALE. Locale is set to undefined here so router does not add it once again.
          router.push(fullURLObject.href, { locale: undefined });
        }}
      />
    </>
  );
};

export default SearchButton;
