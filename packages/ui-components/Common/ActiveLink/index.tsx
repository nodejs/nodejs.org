import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import type { LinkLike } from '@node-core/ui-components/types';

export type ActiveLocalizedLinkProps = ComponentProps<LinkLike> & {
  activeClassName?: string;
  allowSubPath?: boolean;
  pathname: string;
  Wrapper: LinkLike;
};

const ActiveLink: FC<ActiveLocalizedLinkProps> = ({
  children,
  activeClassName = 'active',
  allowSubPath = false,
  className,
  href = '',
  pathname = '/',
  Wrapper = 'a',
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

  return (
    <Wrapper className={finalClassName} href={href} {...props}>
      {children}
    </Wrapper>
  );
};

export default ActiveLink;
