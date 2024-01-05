import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import Tabs from '@/components/Common/Tabs';
import { Link } from '@/navigation.mjs';

import styles from './index.module.css';

export type CodeTabsExternaLink = {
  linkUrl?: string;
  linkText?: string;
};

type CodeTabsProps = Pick<
  ComponentProps<typeof Tabs>,
  'tabs' | 'onValueChange' | 'defaultValue'
> &
  CodeTabsExternaLink;

const CodeTabs: FC<PropsWithChildren<CodeTabsProps>> = ({
  children,
  linkUrl,
  linkText,
  ...props
}) => (
  <Tabs
    {...props}
    className={styles.root}
    headerClassName={styles.header}
    addons={
      linkUrl &&
      linkText && (
        <Link className={styles.link} href={linkUrl}>
          {linkText}
          <ArrowUpRightIcon className={styles.icon} />
        </Link>
      )
    }
  >
    {children}
  </Tabs>
);

export default CodeTabs;
