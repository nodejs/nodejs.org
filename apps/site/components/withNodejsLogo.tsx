import NodejsLogo from '@node-core/ui-components/Common/NodejsLogo';
import type { FC } from 'react';

import { siteConfig } from '@/next.json.mjs';

const WithNodejsLogo: FC = () => (
  <NodejsLogo variant={siteConfig.logoVariant} />
);

export default WithNodejsLogo;
