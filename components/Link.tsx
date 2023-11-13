import { useMemo } from 'react';
import type { FC, ComponentProps, HTMLAttributes as Attributes } from 'react';

import { Link as LocalizedLink } from '@/navigation.mjs';

// This is a wrapper on HTML's `a` tag
const Html: FC<Attributes<HTMLAnchorElement>> = ({ children, ...p }) => (
  <a {...p}>{children}</a>
);

// This is Next.js's Link Component but with pre-fetch disabled
const Next: FC<ComponentProps<typeof Link>> = ({ children, ...p }) => (
  <LocalizedLink {...p}>{children}</LocalizedLink>
);

const Link: FC<ComponentProps<typeof LocalizedLink>> = ({
  children,
  ...props
}) => {
  const Component = useMemo(
    // Uses a different Link element/tag based on the nature of the Link
    // as we don't want prefetch/rsc or etc for external links
    () =>
      !props.href || props.href.toString().startsWith('http') ? Html : Next,
    [props.href]
  );

  return <Component {...props}>{children}</Component>;
};

export default Link;
