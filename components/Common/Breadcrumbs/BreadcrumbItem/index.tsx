import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type BreadcrumbItemProps = {
  hidden?: boolean;
  hideSeparator?: boolean;
  name?: string;
  position?: number;
} & ComponentProps<'li'>;

const BreadcrumbItem: FC<PropsWithChildren<BreadcrumbItemProps>> = ({
  children,
  hidden = false,
  hideSeparator = false,
  name,
  position,
  ...other
}) => (
  <li
    {...other}
    itemProp="itemListElement"
    itemScope
    itemType="https://schema.org/ListItem"
    className={classNames(
      styles.item,
      { [styles.visuallyHidden]: hidden },
      other.className
    )}
    aria-hidden={hidden ? 'true' : undefined}
  >
    {children}
    {name && <span itemProp="name">{name}</span>}
    {position && <meta itemProp="position" content={`${position}`} />}
    {!hideSeparator && (
      <ChevronRightIcon aria-hidden="true" className={styles.separator} />
    )}
  </li>
);

export default BreadcrumbItem;
