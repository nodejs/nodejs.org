import { useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { linkWithLocale } from '@/util/linkWithLocale';
import type { FC, ComponentProps, HTMLAttributes } from 'react';

// This is a wrapper on HTML's `a` tag
const HtmlLink: FC<HTMLAttributes<HTMLAnchorElement>> = ({
  children,
  ...extra
}) => <a {...extra}>{children}</a>;

// This is Next.js's Link Component but with pre-fetch disabled
const NextLink: FC<ComponentProps<typeof Link>> = ({ children, ...extra }) => (
  <Link {...extra} prefetch={false}>
    {children}
  </Link>
);

const LocalizedLink: FC<ComponentProps<typeof Link>> = ({
  href,
  children,
  ...extra
}) => {
  const { currentLocale } = useLocale();

  const { Component, finalHref } = useMemo(() => {
    if (/^https?:\/\//.test(href.toString())) {
      return { Component: HtmlLink, finalHref: href.toString() };
    }

    const addLocaleToHref = linkWithLocale(currentLocale.code);

    return { Component: NextLink, finalHref: addLocaleToHref(href) };
    // We only need to check if the toString() variant of URL has changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocale.code, href.toString()]);

  return (
    <Component {...extra} href={finalHref}>
      {children}
    </Component>
  );
};

export default LocalizedLink;
