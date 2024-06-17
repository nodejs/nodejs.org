import type { FC } from 'react';

import Nodejs from '@/components/Icons/Logos/Nodejs';
import NodejsDarkPride from '@/components/Icons/Logos/NodejsDarkPride';
import NodejsLightPride from '@/components/Icons/Logos/NodejsLightPride';
import type { LogoVariant } from '@/types';

import style from './index.module.css';

type NodejsLogoProps = {
  variant?: LogoVariant;
};

const NodejsLogo: FC<NodejsLogoProps> = ({ variant = 'default' }) => (
  <>
    {variant === 'pride' && (
      <>
        <NodejsDarkPride className={style.nodejsLogoDark} />
        <NodejsLightPride className={style.nodejsLogoLight} />
      </>
    )}
    {variant === 'default' && (
      <>
        <Nodejs className={style.nodejsLogo} />
      </>
    )}
  </>
);

export default NodejsLogo;
