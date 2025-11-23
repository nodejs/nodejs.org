'use client';

import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { SearchResults } from '@orama/ui/components';

import type { Document } from '../DocumentLink';
import type { FC } from 'react';

import { DocumentLink } from '../DocumentLink';
import { getFormattedPath } from './utils';

import styles from './index.module.css';

type SearchItemProps = {
  document: Document;
  mode?: 'search' | 'chat';
};

export const SearchItem: FC<SearchItemProps> = ({ document, mode }) => (
  <SearchResults.Item className={styles.searchResultsItem}>
    <DocumentLink
      document={document as Document}
      tabIndex={mode === 'search' ? 0 : -1}
      aria-hidden={mode === 'chat'}
      data-focus-on-arrow-nav
    >
      <DocumentTextIcon />
      <div>
        {typeof document?.pageSectionTitle === 'string' && (
          <h3>{document.pageSectionTitle}</h3>
        )}
        {typeof document?.pageSectionTitle === 'string' &&
          typeof document?.path === 'string' && (
            <p className={styles.searchResultsItemDescription}>
              {getFormattedPath(document.path, document.pageSectionTitle)}
            </p>
          )}
      </div>
    </DocumentLink>
  </SearchResults.Item>
);
