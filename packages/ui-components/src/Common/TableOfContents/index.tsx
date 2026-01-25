import { ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import { LinkLike } from '#ui/types';

import type { Heading } from '@vcarl/remark-headings';
import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

const depthClasses: Record<number, string> = {
  3: styles.depthThree,
  4: styles.depthFour,
};

type TableOfContentsProps = ComponentProps<'details'> & {
  headings: Array<Heading>;
  summaryTitle: string;
  minDepth?: number;
  maxDepth?: number;
  as?: LinkLike;
};

const TableOfContents: FC<TableOfContentsProps> = ({
  headings,
  summaryTitle,
  minDepth = 2,
  className,
  maxDepth = 4,
  as: Component = 'a',
  ...props
}) => {
  const filteredHeadings = headings.filter(
    ({ depth }) => depth >= minDepth && depth <= maxDepth
  );

  return (
    <details className={classNames(styles.details, className)} {...props}>
      <summary className={styles.summary}>
        <ChevronRightIcon className={styles.icon} /> {summaryTitle}
      </summary>
      <ul className={styles.list}>
        {filteredHeadings.map((head, index) => (
          <li key={head.data?.id ?? index}>
            <Component
              href={head.data?.id && `#${head.data.id}`}
              className={classNames(styles.link, depthClasses[head.depth])}
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
