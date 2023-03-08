import { useContext } from 'react';
import { LayoutContext } from '../providers/layoutProvider';

export const useNextraContext = () => {
  const { pageOpts, pageProps } = useContext(LayoutContext);

  return { ...pageOpts, ...pageProps };
};
