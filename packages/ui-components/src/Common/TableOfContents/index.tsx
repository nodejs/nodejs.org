import classNames from 'classnames';

import { LinkLike } from '#ui/types';

import type { Heading } from '@vcarl/remark-headings';
import type { FC } from 'react';

import styles from './index.module.css';

type TableOfContentsProps = {
  headings: Array<Heading>;
  ariaLabel: string;
  summaryTitle: string;
  minDepth?: number;
  maxDepth?: number;
  as?: LinkLike;
};

const TableOfContents: FC<TableOfContentsProps> = ({
  headings,
  ariaLabel,
  summaryTitle,
  minDepth = 2,
  maxDepth = 4,
  as: Component = 'a',
}) => {
  const filteredHeadings = headings.filter(
    ({ depth }) => depth >= minDepth && depth <= maxDepth
  );

  return (
    <details className={styles.details} aria-label={ariaLabel}>
      <summary className={styles.summary}>{summaryTitle}</summary>
      <ul className={styles.list}>
        {filteredHeadings.map((head, index) => (
          <li key={head.data?.id ?? index}>
            <Component
              href={head.data?.id && `#${head.data.id}`}
              className={classNames(
                styles.link,
                head.depth === 3 && styles.depthThree,
                head.depth === 4 && styles.depthFour
              )}
            >
              {head.value}
            </Component>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default TableOfContents;
