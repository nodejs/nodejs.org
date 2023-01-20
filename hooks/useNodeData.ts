import { useContext } from 'react';
import { NodeDataContext } from '../providers/nodeDataProvider';

export const useNodeData = () => {
  const [currentNodeVersion, currentLtsVersion] = useContext(NodeDataContext);

  return {
    currentLtsVersion: currentLtsVersion || currentNodeVersion,
    currentNodeVersion,
  };
};
