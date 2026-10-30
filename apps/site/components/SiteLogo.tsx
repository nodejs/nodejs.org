import NodejsLogoContainer from '@node-core/ui-components/Common/NodejsLogo';
import { useTranslations } from 'next-intl';

import { siteConfig } from '#site/next.json.mjs';

import type { FC } from 'react';

const SiteLogo: FC = () => {
  const t = useTranslations();
  return (
    <NodejsLogoContainer
      variant={siteConfig.logoVariant}
      aria-label={t('layouts.logo')}
    />
  );
};

export default SiteLogo;
