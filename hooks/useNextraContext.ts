import { useContext } from 'react';
import { LayoutContext } from '../providers/layoutProvider';

export const useNextraContext = () => {
  const { pageOpts } = useContext(LayoutContext);

  return pageOpts;
};
