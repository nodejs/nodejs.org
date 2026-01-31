import BadgeGroup from '@node-core/ui-components/Common/BadgeGroup';
import Footer from '@node-core/ui-components/Containers/Footer';
import { useTranslations } from 'next-intl';

import { getClientContext } from '#site/client-context';
import Link from '#site/components/Link';
import { siteNavigation } from '#site/next.json.mjs';

import type { FC } from 'react';

import WithLegal from './withLegal';
import WithNodeRelease from './withNodeRelease';

const WithFooter: FC = () => {
  const t = useTranslations();
  const { pathname } = getClientContext();

  const { socialLinks, footerLinks } = siteNavigation;

  const navigation = {
    socialLinks,
    footerLinks: footerLinks.map(link => ({
      ...link,
      translation: t(link.text),
    })),
  };

  const primary = (
    <div className="flex flex-row gap-2">
      <WithNodeRelease status={['Active LTS', 'Maintenance LTS']}>
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
    </div>
  );

  const legal = <WithLegal footerLinks={navigation.footerLinks} />;

  return (
    <Footer
      navigation={navigation}
      as={Link}
      pathname={pathname}
      slots={{ primary, legal }}
    />
  );
};

export default WithFooter;
