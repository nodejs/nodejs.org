import type { ReactElement, SVGProps } from 'react';

export interface Supporter {
  // The name of the sponsor
  name: string;
  // A full blown logo to render on the supporters page
  logo: ReactElement<SVGProps<SVGSVGElement>>;
  // A logomark that represents the supporter / icon-sized as it will be 48x48 px
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  // The promoted link to their website or social media
  href: string;
  // The threshold of how often a Supporter should be choosen to render within the Home Page
  threshold: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
}
