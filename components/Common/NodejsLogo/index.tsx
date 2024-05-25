import type { FC } from 'react';

import NodejsDark from '@/components/Icons/Logos/NodejsDark';
import NodejsDarkPride from '@/components/Icons/Logos/NodejsDarkPride';
import NodejsLight from '@/components/Icons/Logos/NodejsLight';
import NodejsLightPride from '@/components/Icons/Logos/NodejsLightPride';

import style from './index.module.css';

type NodejsLogoProps = {
  isPrideEnabled?: boolean;
};

const NodejsLogo: FC<NodejsLogoProps> = ({ isPrideEnabled }) => (
  <>
    {isPrideEnabled ? (
      <>
        <NodejsDarkPride className={style.nodejsLogoDark} />
        <NodejsLightPride className={style.nodejsLogoLight} />
      </>
    ) : (
      <>
        <NodejsDark className={style.nodejsLogoDark} />
        <NodejsLight className={style.nodejsLogoLight} />
      </>
    )}
  </>
);

export default NodejsLogo;
