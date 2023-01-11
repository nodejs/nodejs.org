import { useContext } from 'react';
import { SiteContext } from '../providers/siteProvider';

export const useSiteConfig = () => {
  const siteConfigContext = useContext(SiteContext);

  return siteConfigContext;
};
