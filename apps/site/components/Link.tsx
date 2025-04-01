import type { FC, HTMLProps } from 'react';

import { Link as LocalizedLink } from '@/navigation.mjs';

const Link: FC<HTMLProps<HTMLAnchorElement>> = ({
  children,
  href,
  ...props
}) => {
  if (!href || href.toString().startsWith('http')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <LocalizedLink href={href?.toString()} {...props}>
      {children}
    </LocalizedLink>
  );
};

export default Link;
