import classNames from 'classnames';

import type { LinkLike } from '#ui/types';
import type { ComponentProps, FC } from 'react';

export type ActiveLocalizedLinkProps = ComponentProps<LinkLike> & {
  activeClassName?: string;
  allowSubPath?: boolean;
  pathname?: string;
  as?: LinkLike;
};

const BaseActiveLink: FC<ActiveLocalizedLinkProps> = ({
  activeClassName = 'active',
  allowSubPath = false,
  className,
  href = '',
  pathname = '/',
  as: Component = 'a',
  ...props
}) => {
  const finalClassName = classNames(className, {
    [activeClassName]: allowSubPath
      ? // When using allowSubPath we want only to check if
        // the current pathname starts with the utmost upper level
        // of an href (e.g. /docs/...)
        pathname.startsWith(`/${href.toString().split('/')[1]}`)
      : href.toString() === pathname,
  });

  return <Component className={finalClassName} href={href} {...props} />;
};

export default BaseActiveLink;
