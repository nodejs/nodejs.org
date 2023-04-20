import { useMemo } from 'react';
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

  const localizedUrl = linkWithLocale(currentLocale.code);

  const finalHref = useMemo(
    () =>
      /^https?:\/\//.test(href.toString())
        ? href.toString()
        : localizedUrl(href),
    [href, localizedUrl]
  );

  return (
    <Link {...extra} href={finalHref}>
      {children}
    </Link>
  );
};

export default LocalizedLink;
