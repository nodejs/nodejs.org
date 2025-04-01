import type { FC, PropsWithChildren } from 'react';

import Select from '@node-core/ui-components/Common/Select';
import type { LinkLike } from '@node-core/ui-components/types';

import styles from './index.module.css';

type LinkTab = { key: string; label: string; link: string };

export type LinkTabsProps = PropsWithChildren<{
  label?: string;
  tabs: Array<LinkTab>;
  activeTab: string;
  as?: LinkLike;
  onSelect: (value: string) => void;
}>;

const BaseLinkTabs: FC<LinkTabsProps> = ({
  tabs,
  label,
  activeTab,
  children,
  as: Component = 'a',
  onSelect,
}) => (
  <>
    <div className={styles.tabsList}>
      {tabs.map(tab => (
        <Component
          key={tab.key}
          href={tab.link}
          className={styles.tabsTrigger}
          data-state={tab.key === activeTab ? 'active' : 'inactive'}
        >
          {tab.label}
        </Component>
      ))}
    </div>

    <div className={styles.tabsSelect}>
      <Select
        label={label}
        defaultValue={tabs.find(tab => tab.key === activeTab)?.link}
        values={tabs.map(tab => ({ label: tab.label, value: tab.link }))}
        onChange={onSelect}
      />
    </div>

    {children}
  </>
);

export default BaseLinkTabs;
