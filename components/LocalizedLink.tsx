import { useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from '../hooks/useLocale';
import { linkWithLocale } from '../util/linkWithLocale';
import type { ComponentProps } from 'react';

const LocalizedLink = (props: ComponentProps<typeof Link>) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { href, children, ...extra } = props;

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
