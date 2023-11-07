import type { Heading } from '@vcarl/remark-headings';
import { useTranslations } from 'next-intl';
import { Fragment, useMemo } from 'react';
import type { FC } from 'react';

import { Link } from '@/navigation.mjs';

import styles from './index.module.css';

type MetaBarProps = {
  items: Record<string, React.ReactNode>;
  headings?: {
    items: Heading[];
    depth?: number;
  };
};

const MetaBar: FC<MetaBarProps> = ({ items, headings }) => {
  const t = useTranslations();

  // The default depth of headings to display in the table of contents.
  const { depth = 2, items: headingItems = [] } = headings || {};

  const heading = useMemo(
    () => headingItems.filter(head => head.depth === depth),
    [depth, headingItems]
  );

  return (
    <div className={styles.wrapper}>
      <dl>
        {Object.entries(items).map(([key, value]) => (
          <Fragment key={key}>
            <dt>{t(key)}</dt>
            <dd>{value}</dd>
          </Fragment>
        ))}
        {heading.length > 0 && (
          <Fragment key="tableOfContents">
            <dt>{t('components.metabar.tableOfContents')}</dt>
            <dd>
              <ol>
                {heading.map(head => (
                  <li key={head.value}>
                    <Link href={`#${head?.data?.id || head.value}`}>
                      {head.value}
                    </Link>
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
