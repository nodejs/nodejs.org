'use client';

import { NotificationProvider } from '@node-core/ui-components/Providers/NotificationProvider';

import { NavigationStateProvider } from '#site/providers/navigationStateProvider';

import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <NotificationProvider>
    <NavigationStateProvider>
      <div className={styles.baseLayout}>{children}</div>
    </NavigationStateProvider>
  </NotificationProvider>
);

export default BaseLayout;
