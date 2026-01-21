import classNames from 'classnames';

import type { Heading } from '@vcarl/remark-headings';
import type { FC } from 'react';

import styles from './index.module.css';

type TableOfContentsProps = {
  headings: Array<Heading>;
  minDepth?: number;
  maxDepth?: number;
};

const TableOfContents: FC<TableOfContentsProps> = ({
  headings,
  minDepth = 2,
  maxDepth = 4,
}) => {
  const filteredHeadings = headings.filter(
    ({ depth }) => depth >= minDepth && depth <= maxDepth
  );

  return (
    <details className={styles.details}>
      <summary className={styles.summary}>On this page</summary>
      <ul className={styles.list}>
        {filteredHeadings.map(head => (
          <li key={head.data?.id}>
            <a
              href={`#${head.data?.id}`}
              className={classNames(
                styles.link,
                head.depth === 3 && styles.depthThree,
                head.depth === 4 && styles.depthFour
              )}
            >
              {head.value}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default TableOfContents;
