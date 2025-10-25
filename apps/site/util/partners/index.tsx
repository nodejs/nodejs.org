import {
  CLOUDFLARE,
  DIGITALOCEAN,
  MICROSOFT,
  HERODEVS,
  NODESOURCE,
  VERCEL,
} from '@node-core/ui-components/Icons/PartnerLogos';
import type { ElementType } from 'react';

import type { Partners } from '#site/types';

const PartnersLogo: Record<string, Record<string, ElementType>> = {
  CLOUDFLARE,
  DIGITALOCEAN,
  MICROSOFT,
  HERODEVS,
  NODESOURCE,
  VERCEL,
};

/**
 * Creates an icon element for a component
 */
const createIcon = (
  IconModule: Record<string, Record<string, ElementType>>,
  iconName: string,
  type: 'Logo' | 'Favicon' = 'Favicon'
) => {
  const IconComponent = IconModule[iconName][type || 'Favicon'];
  return <IconComponent width={16} height={16} />;
};

// Creates a list of partners with their respective icons
export const createPartnersList = (
  partnerLists: Array<Omit<Partners, 'logo'>>,
  type?: 'Logo' | 'Favicon'
) =>
  partnerLists.map(({ id, ...partner }) => ({
    id,
    logo: createIcon(PartnersLogo, id, type),
    ...partner,
  }));
