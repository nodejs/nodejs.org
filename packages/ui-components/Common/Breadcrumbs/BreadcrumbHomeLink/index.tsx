import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

import BreadcrumbLink from '#Common/Breadcrumbs/BreadcrumbLink';

type BreadcrumbHomeLinkProps = Omit<
  ComponentProps<typeof BreadcrumbLink>,
  'href'
> &
  Partial<Pick<ComponentProps<typeof BreadcrumbLink>, 'href'>>;

const BreadcrumbHomeLink: FC<BreadcrumbHomeLinkProps> = ({
  href = '/',
  ...props
}) => {
  const ariaLabel = props['aria-label'];
  return (
    <BreadcrumbLink href={href} {...props}>
      <HomeIcon
        title={ariaLabel}
        aria-label={ariaLabel}
        className={styles.icon}
      />
    </BreadcrumbLink>
  );
};

export default BreadcrumbHomeLink;
