import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { FC } from 'react';

import styles from './index.module.css';

type Tab = {
  name: string;
  label: React.ReactNode;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
} & TabsPrimitive.TabsProps;

const Tabs: FC<TabsProps> = ({ tabs, ...props }) => {
  return (
    <TabsPrimitive.Root {...props}>
      <TabsPrimitive.List className={styles.tabsList}>
        {tabs.map(tab => (
          <TabsPrimitive.Trigger
            key={tab.name}
            value={tab.name}
            className={styles.tabsTrigger}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabs.map(tab => (
        <TabsPrimitive.Content key={tab.name} value={tab.name}>
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
};

export default Tabs;
