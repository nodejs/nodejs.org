import type { FC } from 'react';

import Footer from '@/components/Containers/Footer';
import { siteNavigation } from '@/next.json.mjs';

const WithFooter: FC = () => (
  <Footer
    socialLinks={siteNavigation.socialLinks}
    footerLinks={siteNavigation.footerLinks}
  />
);

export default WithFooter;
