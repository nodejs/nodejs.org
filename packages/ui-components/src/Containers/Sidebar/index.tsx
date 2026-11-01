import SidebarCollapsible from '#ui/Containers/Sidebar/SidebarCollapsible';
import SidebarGroup from '#ui/Containers/Sidebar/SidebarGroup';
import { findActiveItem } from '#ui/Containers/Sidebar/utils';

import type { LinkLike } from '#ui/types';
import type { ComponentProps, FC, PropsWithChildren, RefObject } from 'react';

import styles from './index.module.css';

type SidebarProps = {
  groups: Array<
    Pick<ComponentProps<typeof SidebarGroup>, 'items' | 'groupName'>
  >;
  pathname?: string;
  title: string;
  as?: LinkLike;
  placeholder?: string;
  ref?: RefObject<HTMLElement | null>;
};

const SideBar: FC<PropsWithChildren<SidebarProps>> = ({
  groups,
  pathname,
  title,
  as,
  children,
  placeholder,
  ...props
}) => {
  const currentItem = findActiveItem(
    groups.flatMap(({ items }) => items),
    pathname
  );

  return (
    <aside {...props} className={styles.wrapper}>
      {children}

      {groups.length > 0 && (
        // On mobile, the navigation collapses behind a disclosure. On larger
        // screens, the disclosure is always expanded and its summary hidden.
        <SidebarCollapsible
          summary={currentItem?.label ?? placeholder ?? title}
          className={styles.navigation}
        >
          <div className={styles.groups}>
            {groups.map(({ groupName, items }) => (
              <SidebarGroup
                key={groupName.toString()}
                groupName={groupName}
                items={items}
                pathname={pathname}
                as={as}
              />
            ))}
          </div>
        </SidebarCollapsible>
      )}
    </aside>
  );
};

export default SideBar;
