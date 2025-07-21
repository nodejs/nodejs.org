import * as PartnersLogo from '@node-core/ui-components/Icons/PartnerLogos';
import type { ElementType } from 'react';

import type { Partners } from '#site/types';

// import partners from './constants.json';

/**
 * Creates an icon element for a component
 */
const createIcon = (
  IconModule: Record<string, ElementType>,
  iconName: string
) => {
  const IconComponent = IconModule[iconName];
  return <IconComponent width={16} height={16} />;
};

// Package Manager dropdown items
export const partnersList = (partnerLists: Array<Omit<Partners, 'logo'>>) =>
  partnerLists.map(({ id, ...partner }) => {
    return {
      id: id,
      logo: createIcon(PartnersLogo, id),
      ...partner,
    };
  });
