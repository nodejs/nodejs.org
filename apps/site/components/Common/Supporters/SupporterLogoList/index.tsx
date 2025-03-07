import type { FC } from 'react';

import type { Supporter } from '@/types';

type SupporterLogoListProps = {
  supporters: Array<Supporter>;
};

// @TODO: This will be used within the MDX page for Supporters
// to render the Logos of Supporters in the page
// in a grid format that renders logo biggers based on thresholds
const SupporterLogoList: FC<SupporterLogoListProps> = () => null;

export default SupporterLogoList;
