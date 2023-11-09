import useClientContext from '@/hooks/react-server/useClientContext';

const useIsCurrentPathname = () => {
  const { pathname } = useClientContext();

  return {
    isCurrentLocaleRoute: (route: string, allowSubPath?: boolean) => {
      const asPathJustPath = pathname.replace(/[#|?].*$/, '');

      return allowSubPath
        ? asPathJustPath.startsWith(route)
        : route === asPathJustPath;
    },
  };
};

export default useIsCurrentPathname;
