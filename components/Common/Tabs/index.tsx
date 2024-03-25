import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import styles from './index.module.css';

type Tab = { key: string; label: string };

type TabsProps = TabsPrimitive.TabsProps & {
  tabs: Array<Tab>;
  addons?: ReactNode;
  forceDarkTheme?: boolean;
};

const Tabs: FC<PropsWithChildren<TabsProps>> = ({
  tabs,
  addons,
  children,
  ...props
}) => (
  <TabsPrimitive.Root
    {...props}
    className={classNames(styles.tabsRoot, props.className)}
  >
    <TabsPrimitive.List className={styles.tabsList}>
      {tabs.map(tab => (
        <TabsPrimitive.Trigger
          key={tab.key}
          value={tab.key}
          className={classNames(styles.tabsTrigger, {
            [styles.dark]: props.forceDarkTheme,
          })}
        >
          {tab.label}
        </TabsPrimitive.Trigger>
      ))}

      {addons && <div className={styles.addons}>{addons}</div>}
    </TabsPrimitive.List>

    {children}
  </TabsPrimitive.Root>
);

export default Tabs;
