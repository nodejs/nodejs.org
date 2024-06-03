import type { FC } from 'react';
import { useMemo } from 'react';

import BreadcrumbHomeLink from '@/components/Common/Breadcrumbs/BreadcrumbHomeLink';
import BreadcrumbItem from '@/components/Common/Breadcrumbs/BreadcrumbItem';
import BreadcrumbLink from '@/components/Common/Breadcrumbs/BreadcrumbLink';
import BreadcrumbRoot from '@/components/Common/Breadcrumbs/BreadcrumbRoot';
import BreadcrumbTruncatedItem from '@/components/Common/Breadcrumbs/BreadcrumbTruncatedItem';
import type { FormattedMessage } from '@/types';

export type BreadcrumbLink = {
  label: FormattedMessage;
  href: string | undefined;
};

type BreadcrumbsProps = {
  links: Array<BreadcrumbLink>;
  maxLength?: number;
  hideHome?: boolean;
};
// Convert link.label to string and get its length

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  links = [],
  maxLength = 5,
  hideHome = false,
}) => {
  const totalLength = links.length + +!hideHome;
  const lengthOffset = maxLength - totalLength;
  const isOverflow = lengthOffset < 0;

  const formatLabelWithWordCount = (label: string, maxWords: number) => {
    const words = label.split(' ');
    if (words.length > maxWords) {
      return <>{words.slice(0, maxWords).join(' ')} ...</>;
    }
    return label;
  };
  const items = useMemo(
    () =>
      links.map((link, index, items) => {
        const position = index + 1;
        const isLastItem = index === items.length - 1;
        const hidden =
          // We add 1 here to take into account of the truncated breadcrumb.
          position <= Math.abs(lengthOffset) + 1 && isOverflow && !isLastItem;

        const labelString = link.label.toString();
        const formattedLabel = formatLabelWithWordCount(labelString, 6);
        return (
          <BreadcrumbItem
            key={link.label.toString()}
            hidden={hidden}
            hideSeparator={isLastItem}
            position={position + +!hideHome}
          >
            <BreadcrumbLink href={link.href} active={isLastItem}>
              <div className=" text-center">{formattedLabel}</div>
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
