import { useRouter } from 'next/router';
import { useState, useEffect, type FC } from 'react';
import classNames from 'classnames';
import LocalizedLink from '@/components/LocalizedLink';
import type Link from 'next/link';
import type { ComponentProps } from 'react';

type ActiveLocalizedLinkProps = ComponentProps<typeof Link> & {
  activeClassName: string;
};

const ActiveLocalizedLink: FC<ActiveLocalizedLinkProps> = ({
  children,
  activeClassName,
  className,
  ...props
}) => {
  const { asPath, isReady } = useRouter();

  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      const currentHref = (props.as || props.href).toString();

      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkURL = new URL(currentHref, location.href);

      // Using URL().pathname to get rid of query and hash
      const currentPathName = new URL(asPath, location.href).pathname;

      const newClassName = classNames(className, {
        [activeClassName]: linkURL.pathname === currentPathName,
      });

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
