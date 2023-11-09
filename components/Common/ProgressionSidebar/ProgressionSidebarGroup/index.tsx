import type { ComponentProps, FC } from 'react';

import ProgressionSidebarItem from '@/components/Common/ProgressionSidebar/ProgressionSidebarItem';

import styles from './index.module.css';

type ProgressionSidebarGroupProps = {
  activeUrls: string[];
  name: string;
  items: Omit<ComponentProps<typeof ProgressionSidebarItem>, 'isActive'>[];
};

const ProgressionSidebarGroup: FC<ProgressionSidebarGroupProps> = ({
  name,
  items,
  activeUrls,
}) => (
  <ul className={styles.group}>
    <li>
      {name}
      <ul className={styles.items}>
        {items.map(({ url, title }) => (
          <ProgressionSidebarItem
            key={url}
            url={url}
            title={title}
            isActive={Boolean(activeUrls.find(activeUrl => activeUrl === url))}
          />
        ))}
      </ul>
    </li>
  </ul>
);

export default ProgressionSidebarGroup;
