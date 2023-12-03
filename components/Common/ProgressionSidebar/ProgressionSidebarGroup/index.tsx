import type { ComponentProps, FC } from 'react';

import ProgressionSidebarItem from '@/components/Common/ProgressionSidebar/ProgressionSidebarItem';
import type { FormattedMessage } from '@/types';

import styles from './index.module.css';

type ProgressionSidebarGroupProps = {
  groupName: FormattedMessage;
  items: ComponentProps<typeof ProgressionSidebarItem>[];
};

const ProgressionSidebarGroup: FC<ProgressionSidebarGroupProps> = ({
  groupName,
  items,
}) => (
  <div className={styles.group}>
    {groupName}
    <div className={styles.items}>
      {items.map(({ url, title }) => (
        <ProgressionSidebarItem key={url} url={url} title={title} />
      ))}
    </div>
  </div>
);

export default ProgressionSidebarGroup;
