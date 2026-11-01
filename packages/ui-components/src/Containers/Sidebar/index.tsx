import { ChevronDownIcon } from '@heroicons/react/24/outline';

import SidebarGroup from '#ui/Containers/Sidebar/SidebarGroup';

import type { FormattedMessage, LinkLike } from '#ui/types';
import type { ComponentProps, FC, PropsWithChildren, RefObject } from 'react';

import styles from './index.module.css';

type SidebarItemType = {
  label: FormattedMessage;
  link: string;
  items?: Array<SidebarItemType>;
};

const findLabel = (
  items: Array<SidebarItemType>,
  pathname?: string
): FormattedMessage | undefined => {
  for (const item of items) {
    if (item.link === pathname) {
      return item.label;
    }

    const label = item.items && findLabel(item.items, pathname);

    if (label) {
      return label;
    }
  }
};

type SidebarProps = {
  groups: Array<
    Pick<ComponentProps<typeof SidebarGroup>, 'items' | 'groupName'>
  >;
  pathname?: string;
  title: string;
  as?: LinkLike;
  placeholder?: string;
  ref: RefObject<HTMLElement | null>;
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
  const currentLabel = findLabel(
    groups.flatMap(({ items }) => items as Array<SidebarItemType>),
    pathname
  );

  return (
    <aside {...props} className={styles.wrapper}>
      {children}

      {groups.length > 0 && (
        // On mobile, the navigation collapses behind a disclosure. On larger
        // screens, the disclosure is always expanded and its summary hidden.
        <details className={styles.navigation}>
          <summary className={styles.summary}>
            <span>{currentLabel ?? placeholder ?? title}</span>
            <ChevronDownIcon className={styles.chevron} />
          </summary>

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
        </details>
      )}
    </aside>
  );
};

export default SideBar;
