'use client';

import type { FC, PropsWithChildren } from 'react';

import { NavigationStateProvider } from '#site/providers/navigationStateProvider';
import { NotificationProvider } from '#site/providers/notificationProvider';

import styles from './layouts.module.css';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <NotificationProvider viewportClassName="fixed bottom-0 right-0 list-none">
    <NavigationStateProvider>
      <div className={styles.baseLayout}>{children}</div>
    </NavigationStateProvider>
  </NotificationProvider>
);

export default BaseLayout;
