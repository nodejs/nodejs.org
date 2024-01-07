import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import styles from './index.module.css';

type Tab = {
  key: string;
  label: string;
};

type TabsProps = {
  tabs: Array<Tab>;
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
    <div
      className={classNames(headerClassName, {
        [styles.tabsWithAddons]: addons != null,
      })}
    >
      <TabsPrimitive.List className={classNames(styles.tabsList)}>
        {tabs.map(tab => (
          <TabsPrimitive.Trigger
            key={tab.key}
            value={tab.key}
            className={styles.tabsTrigger}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {addons && <div className={styles.addons}>{addons}</div>}
    </div>

    {children}
  </TabsPrimitive.Root>
);

export default Tabs;
