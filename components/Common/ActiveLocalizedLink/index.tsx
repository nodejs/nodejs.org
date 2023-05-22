import { useRouter } from 'next/router';
import { useState, useEffect, type FC } from 'react';
import classNames from 'classnames';
import LocalizedLink from '../../LocalizedLink';
import type { LinkProps } from 'next/link';
import type { PropsWithChildren } from 'react';

type ActiveLocalizedLinkProps = PropsWithChildren &
  LinkProps & {
    className?: string;
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
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathName = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const currentPathName = new URL(asPath, location.href).pathname;

      const newClassName = classNames(className, {
        [activeClassName]: linkPathName === currentPathName,
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
