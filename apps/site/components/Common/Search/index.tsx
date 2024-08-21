import { OramaSearchBox, OramaSearchButton } from '@orama/react-components';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { useState } from 'react';
import '@orama/searchbox/dist/index.css';

import {
  ORAMA_CLOUD_ENDPOINT,
  ORAMA_CLOUD_API_KEY,
} from '@/next.constants.mjs';

export const SearchButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const colorScheme = resolvedTheme as 'light' | 'dark';

  return (
    <>
      <OramaSearchButton
        id="orama-ui-search-button"
        colorScheme={colorScheme}
        onClick={() => setIsOpen(true)}
      >
        Search
      </OramaSearchButton>

      <OramaSearchBox
        id="orama-ui-searchbox"
        open={isOpen}
        onSearchboxClosed={() => setIsOpen(false)}
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
