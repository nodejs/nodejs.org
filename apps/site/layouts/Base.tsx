import { NavigationStateProvider } from '#site/providers/navigationStateProvider';
import { SidebarStateProvider } from '#site/providers/sidebarStateProvider';

import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <NavigationStateProvider>
    <SidebarStateProvider>
      <div className={styles.baseLayout}>{children}</div>
    </SidebarStateProvider>
  </NavigationStateProvider>
);

export default BaseLayout;
