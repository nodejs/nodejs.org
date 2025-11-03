import type { FC, PropsWithChildren } from 'react';

import type { LinkLike } from '#ui/types';

import styles from './index.module.css';
import StatelessSelect from '../Select/StatelessSelect';

type LinkTab = { key: string; label: string; link: string };

export type LinkTabsProps = PropsWithChildren<{
  label?: string;
  tabs: Array<LinkTab>;
  activeTab: string;
  as?: LinkLike;
}>;

const BaseLinkTabs: FC<LinkTabsProps> = ({
  tabs,
  label,
  activeTab,
  children,
  as: Component = 'a',
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

    <StatelessSelect
      label={label}
      className={styles.tabsSelect}
      defaultValue={tabs.find(tab => tab.key === activeTab)?.link}
      values={tabs.map(tab => ({ label: tab.label, value: tab.link }))}
      as={Component}
    />

    {children}
  </>
);

export default BaseLinkTabs;
