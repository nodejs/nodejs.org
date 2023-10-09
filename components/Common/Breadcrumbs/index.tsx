import { type LinkProps } from 'next/link';
import { useMemo, type FC } from 'react';

import BreadcrumbHomeLink from './BreadcrumbHomeLink';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbLink from './BreadcrumbLink';
import BreadcrumbRoot from './BreadcrumbRoot';
import BreadcrumbTruncatedItem from './BreadcrumbTruncatedItem';

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
  maxLength = 5,
  hideHome = false,
}) => {
  const totalLength = links.length + +!hideHome;
  const lengthOffset = maxLength - totalLength;
  const isOverflow = lengthOffset < 0;

  const items = useMemo(
    () =>
      links.map((link, index, items) => {
        const position = index + 1;
        const isLastItem = index === items.length - 1;
        const hidden =
          // We add 1 here to take into account of the truncated breadcrumb.
          position <= Math.abs(lengthOffset) + 1 && isOverflow && !isLastItem;

        return (
          <BreadcrumbItem
            key={link.href.toString()}
            hidden={hidden}
            hideSeparator={isLastItem}
            position={position + +!hideHome}
          >
            <BreadcrumbLink href={link.href} active={isLastItem}>
              {link.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      }),
    [hideHome, isOverflow, lengthOffset, links]
  );

  return (
    <BreadcrumbRoot>
      {!hideHome && (
        <BreadcrumbItem position={1}>
          <BreadcrumbHomeLink />
        </BreadcrumbItem>
      )}
      {isOverflow && <BreadcrumbTruncatedItem />}
      {items}
    </BreadcrumbRoot>
  );
};

export default Breadcrumbs;
