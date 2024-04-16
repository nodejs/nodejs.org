'use client';

import classNames from 'classnames';
import { memo, useMemo } from 'react';
import type { FC, PropsWithChildren } from 'react';

import WithNavBar from '@/components/withNavBar';
import WithProgressionSidebar from '@/components/withProgressionSidebar';
import WithSidebar from '@/components/withSidebar';
import { usePathname } from '@/navigation.mjs';
import { NotificationProvider } from '@/providers/notificationProvider';

import styles from './layouts.module.css';

const getSidebar = (slug: string): FC | null => {
  switch (slug) {
    case 'learn':
      return memo(function Sidebar() {
        return <WithProgressionSidebar navKey="learn" />;
      });
    case 'about':
      return memo(function Sidebar() {
        return <WithSidebar navKeys={['about', 'getInvolved']} />;
      });
    case 'download':
      return null;
    case 'blog':
      return null;
    case '':
      return null;
    default:
      return memo(function Sidebar() {
        return <WithSidebar navKeys={[]} />;
      });
  }
};

const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const slug = pathname.split('/')[1];

  const SidebarComponent = useMemo(() => getSidebar(slug), [slug]);

  return (
    <NotificationProvider viewportClassName="absolute bottom-0 right-0 list-none">
      <div className={styles.baseLayout}>
        <WithNavBar />

        <div
          className={classNames({ [styles.withSidebar]: !!SidebarComponent })}
        >
          {SidebarComponent && <SidebarComponent />}

          {children}
        </div>
      </div>
    </NotificationProvider>
  );
};

export default BaseLayout;
