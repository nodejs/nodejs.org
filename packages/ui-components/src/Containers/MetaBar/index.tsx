import { Fragment, useMemo } from 'react';

import type { LinkLike } from '#ui/types';
import type { Heading } from '@vcarl/remark-headings';
import type { FC, HTMLAttributes } from 'react';

import styles from './index.module.css';

const CODE_LIKE_TYPES = new Set(['method', 'classMethod', 'function', 'ctor']);

type MetaBarProps = {
  items: Partial<Record<string, React.ReactNode>>;
  headings?: {
    items: Array<Heading>;
    minDepth?: number;
  };
  as?: LinkLike;
  heading: string;
} & HTMLAttributes<HTMLElement>;

const MetaBar: FC<MetaBarProps> = ({
  items,
  headings,
  as: Component = 'a',
  heading,
  ...props
}) => {
  // The default depth of headings to display in the table of contents.
  const { minDepth = 2, items: headingItems = [] } = headings || {};

  const filteredHeadings = useMemo(
    () => headingItems.filter(({ depth }) => depth >= minDepth && depth <= 4),
    [minDepth, headingItems]
  );

  return (
    <aside className={styles.wrapper} {...props}>
      <dl>
        {Object.entries(items)
          .filter(([, value]) => !!value)
          .map(([key, value]) => (
            <Fragment key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </Fragment>
          ))}

        {filteredHeadings.length > 0 && (
          <>
            <dt>{heading}</dt>
            <dd>
              <ol>
                {filteredHeadings.map(head => (
                  <li
                    key={head.data?.id}
                    className={
                      head.depth === 3 ? 'pl-2' : head.depth === 4 ? 'pl-4' : ''
                    }
                  >
                    <Component
                      href={`#${head.data?.id}`}
                      className={
                        CODE_LIKE_TYPES.has((head.data?.type as string) ?? '')
                          ? styles.codeLink
                          : undefined
                      }
                    >
                      {' '}
                      {head.value}
                    </Component>
                  </li>
                ))}
              </ol>
            </dd>
          </>
        )}
      </dl>
    </aside>
  );
};

export default MetaBar;
