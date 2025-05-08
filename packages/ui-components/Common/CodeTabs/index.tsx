import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

import Tabs from '#Common/Tabs';

type CodeTabsProps = Pick<
  ComponentProps<typeof Tabs>,
  'tabs' | 'defaultValue' | 'children' | 'addons'
>;

const CodeTabs: FC<CodeTabsProps> = ({ ...props }) => (
  <Tabs {...props} className={styles.root} triggerClassName={styles.trigger} />
);

export default CodeTabs;
