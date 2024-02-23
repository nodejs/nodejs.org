import type { Result } from '@orama/orama';
import type { FC } from 'react';

import { pathToBreadcrumbs } from '@/components/Common/Search/utils';
import Link from '@/components/Link';
import { highlighter } from '@/next.orama.mjs';
import type { SearchDoc } from '@/types';

import styles from './index.module.css';

type SearchResultProps = {
  hit: Result<SearchDoc>;
  searchTerm: string;
};

export const WithSearchResult: FC<SearchResultProps> = props => {
  const isAPIResult = props.hit.document.siteSection.toLowerCase() === 'api';
  const basePath = isAPIResult ? 'https://nodejs.org' : '';
  const path = `${basePath}/${props.hit.document.path}`;

  return (
    <Link
      key={props.hit.id}
      href={path}
      className={styles.fulltextSearchResult}
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
    </Link>
  );
};
