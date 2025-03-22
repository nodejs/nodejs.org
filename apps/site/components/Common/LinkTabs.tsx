'use client';

import BaseLinkTabs from '@node-core/ui-components/Common/BaseLinkTabs';
import type { LinkTabsProps } from '@node-core/ui-components/Common/BaseLinkTabs';
import type { FC } from 'react';

import Link from '@/components/Link';
import { useRouter } from '@/navigation.mjs';

const LinkTabs: FC<Omit<LinkTabsProps, 'as' | 'onSelect'>> = props => {
  const { push } = useRouter();
  return <BaseLinkTabs onSelect={value => push(value)} as={Link} {...props} />;
};

export default LinkTabs;
