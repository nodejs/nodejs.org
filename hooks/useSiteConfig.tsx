import { useContext } from 'react';
import { SiteConfigContext } from '../providers/SiteConfigProvider';

export const useSiteConfig = () => {
  const siteConfigContext = useContext(SiteConfigContext);

  return siteConfigContext;
};
