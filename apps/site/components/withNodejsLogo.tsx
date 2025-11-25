import NodejsLogo from '@node-core/ui-components/Common/NodejsLogo';
import { useTranslations } from 'next-intl';

import { siteConfig } from '#site/next.json.mjs';

import type { FC } from 'react';

const WithNodejsLogo: FC = () => {
  const t = useTranslations();
  return (
    <NodejsLogo
      variant={siteConfig.logoVariant}
      aria-label={t('layouts.logo')}
    />
  );
};

export default WithNodejsLogo;
