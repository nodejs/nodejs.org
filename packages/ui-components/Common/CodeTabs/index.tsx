import type { ComponentProps, FC } from 'react';

import Tabs from '@node-core/ui-components/Common/Tabs';

import styles from './index.module.css';

type CodeTabsProps = Pick<
  ComponentProps<typeof Tabs>,
  'tabs' | 'defaultValue' | 'children' | 'addons'
>;

const CodeTabs: FC<CodeTabsProps> = ({ ...props }) => (
  <Tabs {...props} className={styles.root} triggerClassName={styles.trigger} />
);

export default CodeTabs;
