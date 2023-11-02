'use client';

import useClientContext from '@/hooks/react-client/useClientContext';

const useIsCurrentPathname = () => {
  const { pathname } = useClientContext();

  return {
    isCurrentLocaleRoute: (route: string, allowSubPath?: boolean) =>
      allowSubPath ? pathname.startsWith(route) : route === pathname,
  };
};

export default useIsCurrentPathname;
