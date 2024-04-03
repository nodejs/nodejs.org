import type { Result } from '@orama/orama';
import { useEffect, type FC, useRef } from 'react';

import { pathToBreadcrumbs } from '@/components/Common/Search/utils';
import Link from '@/components/Link';
import { highlighter } from '@/next.orama.mjs';
import type { SearchDoc } from '@/types';
import { searchHitToLinkPath } from '@/util/searchUtils';

import styles from './index.module.css';

type SearchResultProps = {
  hit: Result<SearchDoc>;
  searchTerm: string;
  selected: boolean;
  idx: number;
};

export const WithSearchResult: FC<SearchResultProps> = props => {
  const divRef = useRef<HTMLDivElement>(null);
  const path = searchHitToLinkPath(props.hit);

  useEffect(() => {
    if (props.selected && divRef.current) {
      divRef.current.scrollIntoView({ block: 'center' });
    }
  }, [props.selected]);

  return (
    <Link
      id={`search-hit-${props.idx}`}
      key={props.hit.id}
      href={path}
      className={styles.fulltextSearchResult}
      role="option"
      aria-selected={props.selected}
    >
      <div
        className={styles.fulltextSearchResultTitle}
        ref={divRef}
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
