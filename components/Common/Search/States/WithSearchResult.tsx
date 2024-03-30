import type { Result } from '@orama/orama';
import type { FC } from 'react';

import { pathToBreadcrumbs } from '@/components/Common/Search/utils';
import Link from '@/components/Link';
import { highlighter } from '@/next.orama.mjs';
import type { SearchDoc } from '@/types';
import { searchHitToLinkPath } from '@/util/search';

import styles from './index.module.css';

type SearchResultProps = {
  hit: Result<SearchDoc>;
  searchTerm: string;
  selected: boolean;
};

export const WithSearchResult: FC<SearchResultProps> = props => {
  const path = searchHitToLinkPath(props.hit);

  return (
    <Link
      key={props.hit.id}
      href={path}
      className={styles.fulltextSearchResult}
      data-state={props.selected ? 'selected' : 'not-selected'}
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
