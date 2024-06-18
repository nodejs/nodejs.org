import type { FC } from 'react';

import Nodejs from '@/components/Icons/Logos/Nodejs';
import NodejsPride from '@/components/Icons/Logos/NodejsPride';
import type { LogoVariant } from '@/types';

import style from './index.module.css';

type NodejsLogoProps = {
  variant?: LogoVariant;
};

const NodejsLogo: FC<NodejsLogoProps> = ({ variant = 'default' }) => (
  <>
    {variant === 'pride' && <NodejsPride className={style.nodejsLogo} />}
    {variant === 'default' && <Nodejs className={style.nodejsLogo} />}
  </>
);

export default NodejsLogo;
