import BadgeGroup from '@node-core/ui-components/Common/BadgeGroup';
import Footer from '@node-core/ui-components/Containers/Footer';
import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import { getClientContext } from '#site/client-context';
import Link from '#site/components/Link';
import { siteNavigation } from '#site/next.json.mjs';

import WithNodeRelease from './withNodeRelease';

const WithFooter: FC = async () => {
  const t = await getTranslations();
  const { pathname } = getClientContext();

  const { socialLinks, footerLinks } = siteNavigation;

  const updatedFooterLinks = footerLinks
    .slice(0, -1)
    .map(link => ({ ...link, text: t(link.text) }));

  // Add OpenJS link
  updatedFooterLinks.push(footerLinks.at(-1)!);

  const navigation = {
    socialLinks: socialLinks,
    footerLinks: updatedFooterLinks,
  };

  const primary = (
    <>
      <WithNodeRelease status="Active LTS">
        {({ release }) => (
          <BadgeGroup
            size="small"
            kind="info"
            badgeText={release.versionWithPrefix}
            href={`/blog/release/${release.versionWithPrefix}`}
          >
            {t('components.containers.footer.releasePills.latestLTS')}
          </BadgeGroup>
        )}
      </WithNodeRelease>

      <WithNodeRelease status="Current">
        {({ release }) => (
          <BadgeGroup
            size="small"
            badgeText={release.versionWithPrefix}
            href={`/blog/release/${release.versionWithPrefix}`}
          >
            {t('components.containers.footer.releasePills.latestRelease')}
          </BadgeGroup>
        )}
      </WithNodeRelease>
    </>
  );

  return (
    <Footer
      navigation={navigation}
      as={Link}
      pathname={pathname}
      slots={{ primary }}
    />
  );
};

export default WithFooter;
