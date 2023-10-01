import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import classNames from 'classnames';
import type { FC } from 'react';
import Link, { type LinkProps } from 'next/link';

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
}) => (
  <nav aria-label="breadcrumb" className={styles.wrapper}>
    <ol className={styles.list}>
      {!hideHome && (
        <li className={styles.item}>
          <Link href="/" className={styles.link}>
            <HomeIcon aria-label="Home" className={styles.icon} />
          </Link>
          <ChevronRightIcon
            className={classNames(styles.icon, styles.separator)}
          />
        </li>
      )}
      {links.length > maxLength && (
        <li className={styles.item}>
          {/* NOTE: In the future, this could be expanded with Dropdown feature to allow selection of route */}
          <button disabled>...</button>
          <ChevronRightIcon
            aria-hidden="true"
            className={classNames(styles.icon, styles.separator)}
          />
        </li>
      )}
      {links
        .slice(links.length - maxLength, links.length)
        .map((link, idx, _links) => {
          const isLastItem = idx === _links.length - 1;
          return (
            <li key={link.href.toString()} className={styles.item}>
              <Link
                href={link.href}
                className={styles.link}
                {...(isLastItem && { 'aria-current': 'page' })}
              >
                {link.label}
              </Link>
              {!isLastItem && (
                <ChevronRightIcon
                  aria-hidden="true"
                  className={classNames(styles.icon, styles.separator)}
                />
              )}
            </li>
          );
        })}
    </ol>
  </nav>
);

export default Breadcrumbs;
