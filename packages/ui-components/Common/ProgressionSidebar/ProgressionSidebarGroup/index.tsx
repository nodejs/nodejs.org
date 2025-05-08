import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

import ProgressionSidebarItem from '#Common/ProgressionSidebar/ProgressionSidebarItem';
import type { FormattedMessage, LinkLike } from '#types';

type ProgressionSidebarGroupProps = {
  groupName: FormattedMessage;
  items: Array<ComponentProps<typeof ProgressionSidebarItem>>;
  pathname?: string;
  as?: LinkLike;
};

const ProgressionSidebarGroup: FC<ProgressionSidebarGroupProps> = ({
  groupName,
  items,
  ...props
}) => (
  <section className={styles.group}>
    {groupName}
    <div className={styles.items}>
      {items.map(({ label, link }) => (
        <ProgressionSidebarItem
          key={link}
          label={label}
          link={link}
          {...props}
        />
      ))}
    </div>
  </section>
);

export default ProgressionSidebarGroup;
