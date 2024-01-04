import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import styles from './index.module.css';

type Tab = {
  key: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
  addons?: ReactNode;
  headerClassName?: string;
} & TabsPrimitive.TabsProps;

const Tabs: FC<PropsWithChildren<TabsProps>> = ({
  tabs,
  addons,
  headerClassName,
  children,
  ...props
}) => (
  <TabsPrimitive.Root {...props}>
    <TabsPrimitive.List
      className={classNames(headerClassName, {
        [styles.tabsWithAddons]: addons != null,
      })}
    >
      <div className={classNames(styles.tabsList)}>
        {tabs.map(tab => (
          <TabsPrimitive.Trigger
            key={tab.key}
            value={tab.key}
            className={styles.tabsTrigger}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </div>
      {addons != null && <div className={styles.addons}>{addons}</div>}
    </TabsPrimitive.List>
    {children}
  </TabsPrimitive.Root>
);

export default Tabs;
