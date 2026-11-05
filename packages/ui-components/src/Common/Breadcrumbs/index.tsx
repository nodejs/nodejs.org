import BreadcrumbHomeLink from '#ui/Common/Breadcrumbs/BreadcrumbHomeLink';
import BreadcrumbItem from '#ui/Common/Breadcrumbs/BreadcrumbItem';
import BreadcrumbLink from '#ui/Common/Breadcrumbs/BreadcrumbLink';
import BreadcrumbRoot from '#ui/Common/Breadcrumbs/BreadcrumbRoot';
import BreadcrumbTruncatedItem from '#ui/Common/Breadcrumbs/BreadcrumbTruncatedItem';

import type { FormattedMessage, LinkLike } from '#ui/types';
import type { FC } from 'react';

export type BreadcrumbLink = {
  label: FormattedMessage;
  href: string | undefined;
};

type BreadcrumbsProps = {
  links: Array<BreadcrumbLink>;
  maxLength?: number;
  /** The length below the `sm` breakpoint, when it differs from `maxLength` */
  mobileMaxLength?: number;
  hideHome?: boolean;
  as: LinkLike;
  homeLinkAriaLabel?: string;
};

/**
 * How many leading links make room for the truncated item, so that the
 * breadcrumbs fit `maxLength`. The last link is never hidden.
 */
const getHiddenCount = (totalLength: number, maxLength: number) => {
  const lengthOffset = maxLength - totalLength;

  // We add 1 here to take into account of the truncated breadcrumb.
  return lengthOffset < 0 ? Math.abs(lengthOffset) + 1 : 0;
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  links = [],
  maxLength = 5,
  mobileMaxLength = maxLength,
  hideHome = false,
  as = 'a',
  homeLinkAriaLabel,
}) => {
  const totalLength = links.length + +!hideHome;

  const hiddenCount = getHiddenCount(totalLength, maxLength);
  const hiddenOnMobileCount = getHiddenCount(totalLength, mobileMaxLength);

  const items = links.map((link, index, items) => {
    const position = index + 1;
    const isLastItem = index === items.length - 1;

    const hidden = position <= hiddenCount && !isLastItem;
    const hiddenOnMobile =
      !hidden && position <= hiddenOnMobileCount && !isLastItem;

    return (
      <BreadcrumbItem
        key={link.label.toString()}
        hidden={hidden}
        hiddenOnMobile={hiddenOnMobile}
        hideSeparator={isLastItem}
        position={position + +!hideHome}
      >
        {link.href || isLastItem ? (
          <BreadcrumbLink
            as={as}
            href={link.href || undefined}
            active={isLastItem}
          >
            {link.label}
          </BreadcrumbLink>
        ) : (
          <span className="opacity-70">{link.label}</span>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <BreadcrumbRoot>
      {!hideHome && (
        <BreadcrumbItem position={1}>
          <BreadcrumbHomeLink as={as} aria-label={homeLinkAriaLabel} />
        </BreadcrumbItem>
      )}
      {hiddenCount > 0 ? (
        <BreadcrumbTruncatedItem />
      ) : (
        hiddenOnMobileCount > 0 && <BreadcrumbTruncatedItem mobileOnly />
      )}
      {items}
    </BreadcrumbRoot>
  );
};

export default Breadcrumbs;
