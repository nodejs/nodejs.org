import { useMemo } from 'react';
import Link from 'next/link';
import type { ComponentProps } from 'react';

import { useLocale } from '../hooks/useLocale';
import { linkWithLocale } from '../util/linkWithLocale';

const LocalisedLink = (props: ComponentProps<typeof Link>) => {
  const { href, children, ...extra } = props;

  const { currentLocale } = useLocale();

  const localisedUrl = linkWithLocale(currentLocale.code);

  const finalHref = useMemo(
    () =>
      /^https?:\/\//.test(href.toString())
        ? href.toString()
        : localisedUrl(href),
    [href, localisedUrl]
  );

  return (
    <Link {...extra} href={finalHref}>
      {children}
    </Link>
  );
};

export default LocalisedLink;
