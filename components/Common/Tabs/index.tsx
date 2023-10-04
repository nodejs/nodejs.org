import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ElementRef, ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import styles from './index.module.css';

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>((props, ref) => (
  <TabsPrimitive.List ref={ref} className={styles.tabsList} {...props} />
));

TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>((props, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={styles.tabsTrigger} {...props} />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = TabsPrimitive.Content;
