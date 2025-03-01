import type { FC, HTMLProps } from 'react';

import { Link as LocalizedLink } from '@/navigation.mjs';

type LinkProps = Omit<HTMLProps<HTMLAnchorElement>, 'href'> & {
  href?: string;
};

const Link: FC<LinkProps> = ({ children, href, ...props }) => {
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
