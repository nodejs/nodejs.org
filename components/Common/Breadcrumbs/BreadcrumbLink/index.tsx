import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import LocalizedLink from '@/components/LocalizedLink';

import styles from './index.module.css';

type BreadcrumbLinkProps = {
  active?: boolean;
} & ComponentProps<typeof LocalizedLink>;

const BreadcrumbLink: FC<BreadcrumbLinkProps> = ({
  href,
  active,
  ...props
}) => (
  <LocalizedLink
    itemScope
    itemType="http://schema.org/Thing"
    itemProp="item"
    itemID={href.toString()}
    href={href}
    className={classNames({ [styles.active]: active }, props.className)}
    aria-current={active ? 'page' : undefined}
    {...props}
  />
);

export default BreadcrumbLink;
