import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LocalizedLink from './LocalizedLink';
import type { LinkProps } from 'next/link';
import type { PropsWithChildren } from 'react';

type ActiveLocalizedLinkProps = LinkProps & {
  className?: string;
  activeClassName: string;
};

const ActiveLocalizedLink = ({
  children,
  activeClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLocalizedLinkProps>) => {
  const { asPath, isReady } = useRouter();
  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      const newClassName =
        linkPathname === activePathname
          ? `${className} ${activeClassName}`.trim()
          : className;

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    activeClassName,
    className,
    computedClassName,
  ]);

  return (
    <LocalizedLink className={computedClassName} {...props}>
      {children}
    </LocalizedLink>
  );
};

export default ActiveLocalizedLink;
