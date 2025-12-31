import { NavigationStateProvider } from '#site/providers/navigationStateProvider';

import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <NavigationStateProvider>
    <div className={styles.baseLayout}>{children}</div>
  </NavigationStateProvider>
);

export default BaseLayout;
