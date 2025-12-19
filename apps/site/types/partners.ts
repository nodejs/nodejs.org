import type * as PartnerLogos from '@node-core/ui-components/Icons/PartnerLogos';
import type { ReactElement, SVGProps } from 'react';

export type Partner = {
  id: keyof typeof PartnerLogos;
  /**
   * The name of the partner
   */
  name: string;
  /**
   * A logo to render on the partners page
   */
  logo: ReactElement<SVGProps<SVGSVGElement>>;
  /**
   * The promoted link to their website or social media
   */
  href: string;
  /**
   * The categories this partner belongs to
   */
  categories: Array<PartnerCategory>;
  /**
   * An optional description of the partner
   */
  description?: string;
  /**
   * The weight of the partner, used for random selection
   */
  weight: number;
};

export type PartnerCategory = 'infrastructure' | 'esp';
