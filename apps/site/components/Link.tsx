import type { FC, AnchorHTMLAttributes, ComponentProps } from 'react';

import { Link as LocalizedLink } from '#site/navigation.mjs';

export type LinkProps =
  | ComponentProps<typeof LocalizedLink>
  | AnchorHTMLAttributes<HTMLAnchorElement>;

const Link: FC<LinkProps> = ({ href, ...props }) => {
  if (!href || /^https?:/.test(href as string)) {
    return <a href={href as string} {...props} />;
  }

  return <LocalizedLink href={href} {...props} />;
};

export default Link;
