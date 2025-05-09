'use client';

import Footer from '@node-core/ui-components/Containers/Footer';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '#site/components/Link';
import { usePathname } from '#site/navigation.mjs';
import { siteNavigation } from '#site/next.json.mjs';

const WithFooter: FC = () => {
  const t = useTranslations();
  const pathname = usePathname();

  const { socialLinks, footerLinks } = siteNavigation;
  const updatedFooterLinks = footerLinks
    .slice(0, -1)
    .map(link => ({ ...link, text: t(link.text) }));

  // Add OpenJS link
  updatedFooterLinks.push(footerLinks.at(-1)!);

  const navigation = { socialLinks, footerLinks: updatedFooterLinks };

  return <Footer navigation={navigation} as={Link} pathname={pathname} />;
};

export default WithFooter;
