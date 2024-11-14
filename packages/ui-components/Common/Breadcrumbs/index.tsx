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
  LinkWrapper: LinkLike;
  homeLinkAriaLabel?: string;
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  links = [],
  maxLength = 5,
  hideHome = false,
  LinkWrapper = 'a',
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
            <BreadcrumbLink
              Wrapper={LinkWrapper}
              href={link.href}
              active={isLastItem}
            >
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
          <BreadcrumbHomeLink
            Wrapper={LinkWrapper}
            aria-label={homeLinkAriaLabel}
          />
        </BreadcrumbItem>
      )}
      {isOverflow && <BreadcrumbTruncatedItem />}
      {items}
    </BreadcrumbRoot>
  );
};

export default Breadcrumbs;
