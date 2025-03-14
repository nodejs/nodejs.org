import type { ComponentProps, FC } from 'react';

import Nodejs from '@/components/Icons/Logos/Nodejs';
import type { LogoVariant } from '@/types';

import style from './index.module.css';

type NodejsLogoProps = ComponentProps<typeof Nodejs> & {
  variant?: LogoVariant;
};

const NodejsLogo: FC<NodejsLogoProps> = ({ variant = 'default', ...props }) => (
  <Nodejs variant={variant} className={style.nodejsLogo} {...props} />
);

export default NodejsLogo;
