import type { FC } from 'react';

import NodejsDark from '@/components/Icons/Logos/NodejsDark';
import NodejsDarkPride from '@/components/Icons/Logos/NodejsDarkPride';
import NodejsLight from '@/components/Icons/Logos/NodejsLight';
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
        <NodejsDark className={style.nodejsLogoDark} />
        <NodejsLight className={style.nodejsLogoLight} />
      </>
    )}
  </>
);

export default NodejsLogo;
