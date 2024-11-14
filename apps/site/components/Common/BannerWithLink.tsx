import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import type { BannerProps } from '@node-core/ui-components/Common/Banner';
import Banner from '@node-core/ui-components/Common/Banner';
import type { FC, PropsWithChildren } from 'react';

import Link from '@/components/Link';

type BannerWithLinkProps = BannerProps & {
  link: string;
};

const BannerWithLink: FC<PropsWithChildren<BannerWithLinkProps>> = ({
  type = 'default',
  link,
  children,
}) => (
  <Banner type={type}>
    {link ? <Link href={link}>{children}</Link> : children}
    {link && <ArrowUpRightIcon />}
  </Banner>
);

export default BannerWithLink;
