import type { FC } from 'react';

import NodejsIcon from '@node-core/ui-components/Icons/Logos/Nodejs';
import type { LogoVariant } from '@node-core/ui-components/types';

import style from './index.module.css';

type NodejsLogoProps = {
  variant?: LogoVariant;
};

const NodejsLogo: FC<NodejsLogoProps> = ({ variant = 'default' }) => (
  <NodejsIcon variant={variant} className={style.nodejsLogo} />
);

export default NodejsLogo;
