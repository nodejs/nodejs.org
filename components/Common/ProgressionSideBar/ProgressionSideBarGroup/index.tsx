import type { ComponentProps, FC } from 'react';

import ProgressionSidebarItem from '@/components/Common/ProgressionSideBar/ProgressionSideBarItem';
import type { FormattedMessage } from '@/types';

import styles from './index.module.css';

type ProgressionSideBarGroupProps = {
  groupName: FormattedMessage;
  items: ComponentProps<typeof ProgressionSidebarItem>[];
};

const ProgressionSideBarGroup: FC<ProgressionSideBarGroupProps> = ({
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

export default ProgressionSideBarGroup;
