import { For } from 'million/react';
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
      <For each={tabs}>
        {({ key, label, link }) => (
          <Link
            key={key}
            href={link}
            className={styles.tabsTrigger}
            data-state={key === activeTab ? 'active' : 'inactive'}
          >
            {label}
          </Link>
        )}
      </For>
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
