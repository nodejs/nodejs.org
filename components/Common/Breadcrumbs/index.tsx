import classNames from 'classnames';
import { type LinkProps } from 'next/link';
import Link from 'next/link';
import { useMemo, type FC } from 'react';

import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbRoot from './BreadcrumbRoot';
import styles from './index.module.css';

type BreadcrumbLink = {
  label: string;
  href: LinkProps['href'];
};

type BreadcrumbsProps = {
  links: BreadcrumbLink[];
  maxLength?: number;
  hideHome?: boolean;
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  links,
  maxLength = 3,
  hideHome = false,
}) => {
  const items = useMemo(
    () =>
      links.length > maxLength ? links.slice(links.length - maxLength) : links,
    [links, maxLength]
  );
  return (
    <BreadcrumbRoot hideHome={hideHome}>
      {links.length > maxLength && (
        <BreadcrumbItem>
          {/* NOTE: In the future, this could be expanded with Dropdown feature to allow selection of route */}
          <button disabled>...</button>
        </BreadcrumbItem>
      )}
      {items.map((link, idx, arr) => {
        const isLastItem = idx === arr.length - 1;
        return (
          <BreadcrumbItem key={link.href.toString()} hideSeparator={isLastItem}>
            <Link
              href={link.href}
              className={classNames({
                [styles.active]: isLastItem,
              })}
              {...(isLastItem && { 'aria-current': 'page' })}
            >
              {link.label}
            </Link>
          </BreadcrumbItem>
        );
      })}
    </BreadcrumbRoot>
  );
};

export default Breadcrumbs;
