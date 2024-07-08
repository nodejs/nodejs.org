import type { FC } from 'react';

import Nodejs from '@/components/Icons/Logos/Nodejs';
import type { LogoVariant } from '@/types';

import style from './index.module.css';

type NodejsLogoProps = {
  variant?: LogoVariant;
};

const NodejsLogo: FC<NodejsLogoProps> = ({ variant = 'default' }) => (
  <Nodejs variant={variant} className={style.nodejsLogo} />
);

export default NodejsLogo;
