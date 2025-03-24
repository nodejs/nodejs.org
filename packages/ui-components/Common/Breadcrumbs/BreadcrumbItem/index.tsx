import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type BreadcrumbItemProps = {
  disableMicrodata?: boolean;
  hidden?: boolean;
  hideSeparator?: boolean;
  position?: number;
} & ComponentProps<'li'>;

const BreadcrumbItem: FC<PropsWithChildren<BreadcrumbItemProps>> = ({
  disableMicrodata,
  children,
  hidden = false,
  hideSeparator = false,
  position,
  ...props
}) => (
  <li
    {...props}
    itemProp={!disableMicrodata ? 'itemListElement' : undefined}
    itemScope={!disableMicrodata ? true : undefined}
    itemType={!disableMicrodata ? 'https://schema.org/ListItem' : undefined}
    className={classNames(
      styles.item,
      { [styles.visuallyHidden]: hidden },
      props.className
    )}
    aria-hidden={hidden ? 'true' : undefined}
  >
    {children}
    {position && <meta itemProp="position" content={`${position}`} />}
    {!hideSeparator && (
      <ChevronRightIcon aria-hidden="true" className={styles.separator} />
    )}
  </li>
);

export default BreadcrumbItem;
