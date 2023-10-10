import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type Tab = {
  key: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
  headerClassName?: string;
} & TabsPrimitive.TabsProps;

const Tabs: FC<PropsWithChildren<TabsProps>> = ({
  tabs,
  headerClassName,
  children,
  ...props
}) => (
  <TabsPrimitive.Root {...props}>
    <TabsPrimitive.List
      className={classNames(styles.tabsList, headerClassName)}
    >
      {tabs.map(tab => (
        <TabsPrimitive.Trigger
          key={tab.key}
          value={tab.label}
          className={styles.tabsTrigger}
        >
          {tab.label}
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>
    {children}
  </TabsPrimitive.Root>
);

export default Tabs;
