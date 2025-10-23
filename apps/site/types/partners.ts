import type { ReactElement, SVGProps } from 'react';

export type Partners = {
  id: string;
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

export type Supporters = {
  name: string;
  image: string;
  url: string;
  profile: string;
  source: 'opencollective' | 'github';
};

export type RandomPartnerListConfig = {
  /**
   * Number of partners to pick from the list.
   * If null, all partners will be returned.
   */
  pick?: number | null;
  /**
   * Date seed to use for the randomization.
   * This is used to ensure that the same partners are returned for the same date.
   */
  dateSeed?: number;
  /**
   * Category of partners to filter by.
   * If not provided, all partners will be returned.
   */
  category?: PartnerCategory;
  /**
   * Whether to randomize the partners or not.
   */
  sort?: 'name' | 'weight' | null;
};
