'use client';

import classNames from 'classnames';
import { memo, useMemo, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';

import WithNavBar from '@/components/withNavBar';
import WithProgressionSidebar from '@/components/withProgressionSidebar';
import WithSidebar from '@/components/withSidebar';
import { usePathname } from '@/navigation.mjs';
import { NotificationProvider } from '@/providers/notificationProvider';
import { ShowSidebarProvider } from '@/providers/showSidebarProvider';

import styles from './layouts.module.css';

const getSidebar = (slug: string): FC | false => {
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
      return false;
    case 'blog':
      return false;
    case '':
      return false;
    default:
      return memo(function Sidebar() {
        return <WithSidebar navKeys={[]} />;
      });
  }
};

type BaseLayoutProps = PropsWithChildren<{ showSidebar?: boolean }>;

const BaseLayout: FC<BaseLayoutProps> = ({
  children,
  showSidebar: show = true,
}) => {
  const [showSidebar, setShowSidebar] = useState(show);
  const pathname = usePathname();
  const slug = pathname.split('/')[1];

  const SidebarComponent = useMemo(
    () => showSidebar && getSidebar(slug),
    [showSidebar, slug]
  );

  return (
    <NotificationProvider viewportClassName="absolute bottom-0 right-0 list-none">
      <ShowSidebarProvider value={setShowSidebar}>
        <div className={styles.baseLayout}>
          <WithNavBar />

          <main
            className={classNames({ [styles.withSidebar]: !!SidebarComponent })}
          >
            {SidebarComponent && <SidebarComponent />}

            {children}
          </main>
        </div>
      </ShowSidebarProvider>
    </NotificationProvider>
  );
};

export default BaseLayout;
