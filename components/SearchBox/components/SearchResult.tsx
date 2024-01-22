import type { Result } from '@orama/orama';
import NextLink from 'next/link';
import type { FC } from 'react';

import type { SearchDoc } from '@/components/SearchBox/components/SearchBox';
import { highlighter } from '@/components/SearchBox/lib/orama';
import { pathToBreadcrumbs } from '@/components/SearchBox/lib/utils';

import styles from './index.module.css';

type SearchResultProps = {
  hit: Result<SearchDoc>;
  searchTerm: string;
};

export const SearchResult: FC<SearchResultProps> = props => {
  const isAPIResult = props.hit.document.siteSection.toLowerCase() === 'api';
  const basePath = isAPIResult ? 'https://nodejs.org/docs/latest' : '/en';
  const path = `${basePath}/${props.hit.document.path}`;

  return (
    <NextLink
      key={props.hit.id}
      href={path}
      className={styles.fulltextSearchResult}
      target={isAPIResult ? '_blank' : undefined}
      rel={isAPIResult ? 'noopener noreferrer' : undefined}
    >
      <div
        className={styles.fulltextSearchResultTitle}
        dangerouslySetInnerHTML={{
          __html: highlighter
            .highlight(props.hit.document.pageSectionTitle, props.searchTerm)
            .trim(125),
        }}
      />
      <div className={styles.fulltextSearchResultBreadcrumb}>
        {pathToBreadcrumbs(props.hit.document.path).join(' > ')}
        {' > '}
        {props.hit.document.pageTitle}
      </div>
    </NextLink>
  );
};
