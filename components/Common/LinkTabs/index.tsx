import type { FC, PropsWithChildren } from 'react';

import Link from '@/components/Link';

import styles from './index.module.css';

type LinkTab = { key: string; label: string; link: string };

type LinkTabsProps = { tabs: Array<LinkTab>; activeTab: string };

const LinkTabs: FC<PropsWithChildren<LinkTabsProps>> = ({
  tabs,
  activeTab,
  children,
}) => (
  <>
    <div className={styles.tabsList}>
      {tabs.map(tab => (
        <Link
          key={tab.key}
          href={tab.link}
          className={styles.tabsTrigger}
          data-state={tab.key === activeTab ? 'active' : 'inactive'}
        >
          {tab.label}
        </Link>
      ))}
    </div>

    {children}
  </>
);

export default LinkTabs;
