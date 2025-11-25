import NodejsIcon, { type NodeJsLogoProps } from '#ui/Icons/Logos/Nodejs';

import type { FC } from 'react';

import style from './index.module.css';

const NodejsLogo: FC<NodeJsLogoProps> = props => {
  return <NodejsIcon className={style.nodejsLogo} {...props} />;
};

export default NodejsLogo;
