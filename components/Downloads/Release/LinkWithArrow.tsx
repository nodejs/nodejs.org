import type { UrlObject } from 'url';

import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import type { FC, PropsWithChildren } from 'react';

import { Link } from '@/navigation.mjs';

type AccessibleAnchorProps = {
  url: string | UrlObject;
};

const LinkWithArrow: FC<PropsWithChildren<AccessibleAnchorProps>> = ({
  children,
  url,
}) => (
  <Link href={url}>
    {children}
    <ArrowUpRightIcon className="ml-1 inline w-3 fill-white" />
  </Link>
);

export default LinkWithArrow;
