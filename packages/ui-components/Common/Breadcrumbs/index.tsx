import type { FC } from 'react';
import { useMemo } from 'react';

import BreadcrumbHomeLink from '@node-core/ui-components/Common/Breadcrumbs/BreadcrumbHomeLink';
import BreadcrumbItem from '@node-core/ui-components/Common/Breadcrumbs/BreadcrumbItem';
import BreadcrumbLink from '@node-core/ui-components/Common/Breadcrumbs/BreadcrumbLink';
import BreadcrumbRoot from '@node-core/ui-components/Common/Breadcrumbs/BreadcrumbRoot';
import BreadcrumbTruncatedItem from '@node-core/ui-components/Common/Breadcrumbs/BreadcrumbTruncatedItem';
import type {
  FormattedMessage,
  LinkLike,
} from '@node-core/ui-components/types';

export type BreadcrumbLink = {
  label: FormattedMessage;
  href: string | undefined;
};

type BreadcrumbsProps = {
  links: Array<BreadcrumbLink>;
  maxLength?: number;
  hideHome?: boolean;
  as: LinkLike;
  homeLinkAriaLabel?: string;
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  links = [],
  maxLength = 5,
  hideHome = false,
  as = 'a',
  homeLinkAriaLabel,
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
            key={link.label.toString()}
            hidden={hidden}
            hideSeparator={isLastItem}
            position={position + +!hideHome}
          >
            {link.href ? (
              <BreadcrumbLink as={as} href={link.href} active={isLastItem}>
                {link.label}
              </BreadcrumbLink>
            ) : (
              <span className="opacity-70">{link.label}</span>
            )}
          </BreadcrumbItem>
        );
      }),
    [hideHome, isOverflow, lengthOffset, links]
  );

  return (
    <BreadcrumbRoot>
      {!hideHome && (
        <BreadcrumbItem position={1}>
          <BreadcrumbHomeLink as={as} aria-label={homeLinkAriaLabel} />
        </BreadcrumbItem>
      )}
      {isOverflow && <BreadcrumbTruncatedItem />}
      {items}
    </BreadcrumbRoot>
  );
};

export default Breadcrumbs;
