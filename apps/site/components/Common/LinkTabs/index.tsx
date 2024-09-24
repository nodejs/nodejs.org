import type { FC, PropsWithChildren } from 'react';

import Link from '@/components/Link';
import WithRouterSelect from '@/components/withRouterSelect';

import styles from './index.module.css';

type LinkTab = { key: string; label: string; link: string };

type LinkTabsProps = {
  label?: string;
  tabs: Array<LinkTab>;
  activeTab: string;
};

const LinkTabs: FC<PropsWithChildren<LinkTabsProps>> = ({
  tabs,
  label,
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

    <div className={styles.tabsSelect}>
      <WithRouterSelect
        label={label}
        defaultValue={tabs.find(tab => tab.key === activeTab)?.link}
        values={tabs.map(tab => ({ label: tab.label, value: tab.link }))}
      />
    </div>

    {children}
  </>
);

export default LinkTabs;
