import type { Heading } from '@vcarl/remark-headings';
import { Fragment, useMemo } from 'react';
import type { FC } from 'react';

import type { LinkLike } from '@node-core/ui-components/types';

import styles from './index.module.css';

type MetaBarProps = {
  items: Partial<Record<string, React.ReactNode>>;
  headings?: {
    items: Array<Heading>;
    minDepth?: number;
  };
  as?: LinkLike;
  heading: string;
};

const MetaBar: FC<MetaBarProps> = ({
  items,
  headings,
  as: Component = 'a',
  heading,
}) => {
  // The default depth of headings to display in the table of contents.
  const { minDepth = 2, items: headingItems = [] } = headings || {};

  const filteredHeadings = useMemo(
    () => headingItems.filter(({ depth }) => depth >= minDepth && depth <= 4),
    [minDepth, headingItems]
  );

  return (
    <div className={styles.wrapper}>
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
                    key={head.value}
                    className={
                      head.depth === 3 ? 'pl-2' : head.depth === 4 ? 'pl-4' : ''
                    }
                  >
                    <Component href={`#${head?.data?.id}`}>
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
    </div>
  );
};

export default MetaBar;
