import type { ComponentProps, FC } from 'react';

import ProgressionSidebarItem from '@/components/Common/ProgressionSidebar/ProgressionSidebarItem';
import type { FormattedMessage } from '@/types';

import styles from './index.module.css';

type ProgressionSidebarGroupProps = {
  groupName: FormattedMessage;
  items: Array<ComponentProps<typeof ProgressionSidebarItem>>;
};

const ProgressionSidebarGroup: FC<ProgressionSidebarGroupProps> = ({
  groupName,
  items,
}) => (
  <section className={styles.group}>
    {groupName}
    <div className={styles.items}>
      {items.map(({ label, link }) => (
        <ProgressionSidebarItem key={link} label={label} link={link} />
      ))}
    </div>
  </section>
);

export default ProgressionSidebarGroup;
