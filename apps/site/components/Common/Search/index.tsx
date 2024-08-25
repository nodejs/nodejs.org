'use client';

import { OramaSearchBox, OramaSearchButton } from '@orama/react-components';
import { useTheme } from 'next-themes';
import { type FC } from 'react';

import {
  ORAMA_CLOUD_ENDPOINT,
  ORAMA_CLOUD_API_KEY,
} from '@/next.constants.mjs';

const SearchButton: FC = () => {
  const { resolvedTheme } = useTheme();
  const colorScheme = resolvedTheme as 'light' | 'dark';

  return (
    <>
      <OramaSearchButton style={{ flexGrow: 1 }} colorScheme={colorScheme}>
        Search
      </OramaSearchButton>

      <OramaSearchBox
        colorScheme={colorScheme}
        index={{ api_key: ORAMA_CLOUD_API_KEY, endpoint: ORAMA_CLOUD_ENDPOINT }}
        facetProperty="siteSection"
        resultMap={{
          title: 'pageTitle',
          description: 'pageSectionContent',
          section: 'siteSection',
          path: 'path',
        }}
        sourcesMap={{
          title: 'pageTitle',
          description: 'path',
          path: 'path',
        }}
        sourceBaseUrl="/en/"
        suggestions={[
          'How to install Node.js',
          'Creating a npm package',
          'Upgrading Node.js',
        ]}
      />
    </>
  );
};

export default SearchButton;
