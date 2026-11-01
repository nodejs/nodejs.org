import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import classNames from 'classnames';

import type { ComponentProps, FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type BreadcrumbItemProps = {
  disableMicrodata?: boolean;
  hidden?: boolean;
  /** Hidden below the `sm` breakpoint only */
  hiddenOnMobile?: boolean;
  /** Shown below the `sm` breakpoint only */
  mobileOnly?: boolean;
  hideSeparator?: boolean;
  position?: number;
} & ComponentProps<'li'>;

const BreadcrumbItem: FC<PropsWithChildren<BreadcrumbItemProps>> = ({
  disableMicrodata,
  children,
  hidden = false,
  hiddenOnMobile = false,
  mobileOnly = false,
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
      {
        [styles.visuallyHidden]: hidden,
        [styles.hiddenOnMobile]: hiddenOnMobile,
        [styles.mobileOnly]: mobileOnly,
      },
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
