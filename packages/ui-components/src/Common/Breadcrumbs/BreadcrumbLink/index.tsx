import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import type { LinkLike } from '#ui/types';

import styles from './index.module.css';

type BreadcrumbLinkProps = {
  active?: boolean;
  as: LinkLike;
} & ComponentProps<LinkLike>;

const BreadcrumbLink: FC<BreadcrumbLinkProps> = ({
  href,
  active,
  as: Component = 'a',
  ...props
}) => (
  <Component
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
  </Component>
);

export default BreadcrumbLink;
