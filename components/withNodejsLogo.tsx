import type { FC } from 'react';

import NodejsLogo from '@/components/Common/NodejsLogo';
import { siteConfig } from '@/next.json.mjs';

const WithNodejsLogo: FC = () => (
  <NodejsLogo isPrideEnabled={siteConfig.enablePrideLogo} />
);

export default WithNodejsLogo;
