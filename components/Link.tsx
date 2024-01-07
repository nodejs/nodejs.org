import type { FC, ComponentProps } from 'react';

import { Link as LocalizedLink } from '@/navigation.mjs';

type LinkProps = Omit<ComponentProps<typeof LocalizedLink>, 'href'> & {
  href: string | undefined;
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
