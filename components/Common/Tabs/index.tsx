import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import styles from './index.module.css';

type Tab = {
  key: string;
  label: string;
  secondaryLabel?: string;
  value?: string;
};

type TabsProps = TabsPrimitive.TabsProps & {
  tabs: Array<Tab>;
  addons?: ReactNode;
  triggerClassName?: string;
};

const Tabs: FC<PropsWithChildren<TabsProps>> = ({
  tabs,
  addons,
  triggerClassName,
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
          value={tab.value ?? tab.key}
          className={classNames(styles.tabsTrigger, triggerClassName)}
        >
          {tab.label}
          {tab.secondaryLabel ? (
            <span className={styles.tabSecondaryLabel}>
              {tab.secondaryLabel}
            </span>
          ) : null}
        </TabsPrimitive.Trigger>
      ))}

      {addons && <div className={styles.addons}>{addons}</div>}
    </TabsPrimitive.List>

    {children}
  </TabsPrimitive.Root>
);

export default Tabs;
