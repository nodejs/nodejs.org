'use client';

import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import Link from '@/components/Link';
import { usePathname } from '@/navigation.mjs';
import { VERSION_SUPPORT_SHORTCUT } from '@/next.constants.mjs';

type ActiveLocalizedLinkProps = ComponentProps<typeof Link> & {
  activeClassName?: string;
  allowSubPath?: boolean;
};

const ActiveLink: FC<ActiveLocalizedLinkProps> = ({
  children,
  activeClassName = 'active',
  allowSubPath = false,
  className,
  href = '',
  ...props
}) => {
  const pathname = usePathname();

  const finalClassName = classNames(className, {
    [activeClassName]: allowSubPath
      ? // When using allowSubPath we want only to check if
        // the current pathname starts with the utmost upper level
        // of an href (e.g. /docs/...)
        pathname.startsWith(`/${href.toString().split('/')[1]}`) &&
        // but not when this link is for the deep link shortcut to previous releases
        href.toString() !== VERSION_SUPPORT_SHORTCUT
      : href.toString() === pathname,
  });

  return (
    <Link className={finalClassName} href={href} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
