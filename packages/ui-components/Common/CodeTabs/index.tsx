import type { ComponentProps, FC, PropsWithChildren } from 'react';

import Tabs from '@node-core/ui-components/Common/Tabs';

import styles from './index.module.css';

type CodeTabsProps = Pick<ComponentProps<typeof Tabs>, 'tabs' | 'defaultValue'>;

const CodeTabs: FC<PropsWithChildren<CodeTabsProps>> = ({
  children,
  ...props
}) => (
  <Tabs {...props} className={styles.root} triggerClassName={styles.trigger}>
    {children}
  </Tabs>
);

export default CodeTabs;
