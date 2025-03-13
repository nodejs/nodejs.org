'use client';

import type { ActiveLocalizedLinkProps } from '@node-core/ui-components/Common/BaseActiveLink';
import BaseActiveLink from '@node-core/ui-components/Common/BaseActiveLink';
import type { FC } from 'react';

import Link from '@/components/Link';
import { usePathname } from '@/navigation.mjs';

const ActiveLink: FC<
  Omit<ActiveLocalizedLinkProps, 'pathname' | 'as'>
> = props => <BaseActiveLink pathname={usePathname()} as={Link} {...props} />;

export default ActiveLink;
