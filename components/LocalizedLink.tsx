import { useMemo } from 'react';
import Link from 'next/link';
import type { ComponentProps } from 'react';

import { useLocale } from '../hooks/useLocale';
import { linkWithLocale } from '../util/linkWithLocale';

const LocalizedLink = (props: ComponentProps<typeof Link>) => {
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
