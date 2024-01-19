import type { Result } from '@orama/orama';
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
  return (
    <a
      key={props.hit.id}
      href={`/en/${props.hit.document.path}`}
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
    </a>
  );
};
