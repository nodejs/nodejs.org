import classNames from 'classnames';
import { type LinkProps } from 'next/link';
import { useMemo, type FC } from 'react';

import LocalizedLink from '@/components/LocalizedLink';

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
  links = [],
  maxLength = 3,
  hideHome = false,
}) => {
  const items = useMemo(() => {
    const itemsToRender = links.slice(
      links.length > maxLength ? -maxLength : 0
    );

    return itemsToRender.map((link, index, items) => {
      const isLastItem = index === items.length - 1;
      let position = index + 1;
      if (!hideHome) {
        position += 1;
      }
      if (links.length > maxLength) {
        position += 1;
      }

      return (
        <BreadcrumbItem key={link.href.toString()} hideSeparator={isLastItem}>
          <LocalizedLink
            itemScope
            itemType="http://schema.org/Thing"
            itemProp="item"
            itemID="/"
            href={link.href}
            className={classNames({
              [styles.active]: isLastItem,
            })}
            aria-current={isLastItem ? 'page' : undefined}
          >
            <span itemProp="name">{link.label}</span>
            <meta itemProp="position" content={`${position}`} />
          </LocalizedLink>
        </BreadcrumbItem>
      );
    });
  }, [links, maxLength, hideHome]);

  return (
    <BreadcrumbRoot hideHome={hideHome}>
      {links.length > maxLength && (
        <BreadcrumbItem>
          <button disabled>...</button>
        </BreadcrumbItem>
      )}
      {items}
    </BreadcrumbRoot>
  );
};

export default Breadcrumbs;
