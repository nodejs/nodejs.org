import BadgeGroup from '@node-core/ui-components/Common/BadgeGroup';
import FooterContainer from '@node-core/ui-components/Containers/Footer';
import { useTranslations } from 'next-intl';

import { getClientContext } from '#site/client-context';
import Link from '#site/components/Link';
import { siteNavigation } from '#site/next.json.mjs';

import type { FC } from 'react';

import FooterLegal from './FooterLegal';
import WithNodeRelease from './withNodeRelease';

const Footer: FC = () => {
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
    <div className="flex flex-row flex-wrap justify-center gap-2">
      <WithNodeRelease status="LTS">
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

      <WithNodeRelease status="Alpha">
        {({ release }) => (
          <BadgeGroup
            size="small"
            kind="warning"
            badgeText={release.versionWithPrefix}
            href={`/blog/release/${release.versionWithPrefix}`}
          >
            {t('components.containers.footer.releasePills.latestAlpha')}
          </BadgeGroup>
        )}
      </WithNodeRelease>
    </div>
  );

  const legal = <FooterLegal footerLinks={navigation.footerLinks} />;

  return (
    <FooterContainer
      navigation={navigation}
      as={Link}
      pathname={pathname}
      slots={{ primary, legal }}
    />
  );
};

export default Footer;
