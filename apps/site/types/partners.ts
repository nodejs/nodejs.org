// import type { ReactElement, SVGProps } from 'react';

import type { ReactElement, SVGProps } from 'react';

export interface Partners {
  id: string;
  // The name of the partner
  name: string;
  // A logo to render on the partners page
  logo: ReactElement<SVGProps<SVGSVGElement>>;
  // The promoted link to their website or social media
  href: string;
  // The categories this partner belongs to
  categories: Array<PartnerCategory>;
  // An optional description of the partner
  description?: string;
  threshold: number;
}

export type PartnerCategory = 'infrastructure' | 'security' | 'esp partner';
