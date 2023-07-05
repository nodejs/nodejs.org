import Link from 'next/link';
import { useLocale } from '../hooks/useLocale';
import { linkWithLocale } from '../util/linkWithLocale';
import type { FC, ComponentProps } from 'react';

const LocalizedLink: FC<ComponentProps<typeof Link>> = ({
  href,
  children,
  ...extra
}) => {
  const { currentLocale } = useLocale();

  if (/^https?:\/\//.test(href.toString())) {
    return (
      <a {...extra} href={href.toString()}>
        {children}
      </a>
    );
  }

  return (
    <Link {...extra} href={linkWithLocale(currentLocale.code)(href)}>
      {children}
    </Link>
  );
};

export default LocalizedLink;
