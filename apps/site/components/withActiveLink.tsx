'use client';

import ActiveLink from '@node-core/ui-components/Common/ActiveLink';
import type { ActiveLocalizedLinkProps } from '@node-core/ui-components/Common/ActiveLink';
import type { FC } from 'react';

import Link from '@/components/Link';
import { usePathname } from '@/navigation.mjs';

type WithActiveLinkProps = Omit<
  ActiveLocalizedLinkProps,
  'Wrapper' | 'pathname'
>;

const WithActiveLink: FC<WithActiveLinkProps> = ({ children, ...props }) => (
  <ActiveLink pathname={usePathname()} Wrapper={Link} {...props}>
    {children}
  </ActiveLink>
);

export default WithActiveLink;
