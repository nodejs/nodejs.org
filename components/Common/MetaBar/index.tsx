import type { Heading } from '@vcarl/remark-headings';
import { Fragment, useMemo } from 'react';
import type { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import LocalizedLink from '@/components/LocalizedLink';

import styles from './index.module.css';

type MetaBarProps = {
  items: Record<string, React.ReactNode>;
  headings?: {
    items: Heading[];
    depth?: number;
  };
};

// The default depth of headings to display in the table of contents.
const DEFAULT_DEPTH: number = 2;

const MetaBar: FC<MetaBarProps> = ({
  items,
  headings = {
    items: [],
  },
}) => {
  const heading = useMemo(
    () =>
      headings.items.filter(
        ({ depth }) => depth === (headings.depth ?? DEFAULT_DEPTH)
      ),
    [headings.depth, headings.items]
  );

  return (
    <div className={styles.wrapper}>
      <dl>
        {Object.entries(items).map(([key, value]) => (
          <Fragment key={key}>
            <dt>
              <FormattedMessage id={key} />
            </dt>
            <dd>{value}</dd>
          </Fragment>
        ))}
        {heading.length > 0 && (
          <Fragment key="tableOfContents">
            <dt>
              <FormattedMessage id="components.metabar.tableOfContents" />
            </dt>
            <dd>
              <ol>
                {heading.map(head => (
                  <li key={head.value}>
                    <LocalizedLink href={`#${head?.data?.id || head.value}`}>
                      {head.value}
                    </LocalizedLink>
                  </li>
                ))}
              </ol>
            </dd>
          </Fragment>
        )}
      </dl>
    </div>
  );
};

export default MetaBar;
