import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import Link from '@/components/Link';

import styles from './index.module.css';

type BreadcrumbLinkProps = {
  active?: boolean;
} & ComponentProps<typeof Link>;

const BreadcrumbLink: FC<BreadcrumbLinkProps> = ({
  href,
  active,
  ...props
}) => (
  <Link
    itemScope
    itemType="http://schema.org/Thing"
    itemProp="item"
    itemID={href?.toString()}
    href={href}
    className={classNames(
      styles.link,
      { [styles.active]: active },
      props.className
    )}
    aria-current={active ? 'page' : undefined}
    {...props}
  >
    <span itemProp="name">{props.children}</span>
  </Link>
);

export default BreadcrumbLink;
