'use client';

import type { FC, PropsWithChildren } from 'react';

import { NotificationProvider } from '@/providers/notificationProvider';

import styles from './layouts.module.css';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <NotificationProvider viewportClassName="absolute bottom-0 right-0 list-none">
    <div className={styles.baseLayout}>{children}</div>
  </NotificationProvider>
);

export default BaseLayout;
