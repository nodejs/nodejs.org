import NodejsLogo from '@node-core/ui-components/Common/NodejsLogo';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { siteConfig } from '@/next.json.mjs';

const WithNodejsLogo: FC = () => {
  const t = useTranslations();
  return (
    <NodejsLogo
      variant={siteConfig.logoVariant}
      ariaLabel={t('layouts.logo')}
    />
  );
};

export default WithNodejsLogo;
