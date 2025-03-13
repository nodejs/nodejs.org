import type { FC } from 'react';

import NodejsIcon from '@node-core/ui-components/Icons/Logos/Nodejs';
import type { LogoVariant } from '@node-core/ui-components/types';

import style from './index.module.css';

type NodejsLogoProps = {
  variant?: LogoVariant;
  ariaLabel?: string;
};

const NodejsLogo: FC<NodejsLogoProps> = ({
  variant = 'default',
  ariaLabel,
}) => {
  return (
    <NodejsIcon
      variant={variant}
      className={style.nodejsLogo}
      ariaLabel={ariaLabel}
    />
  );
};

export default NodejsLogo;
