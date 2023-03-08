import { useContext } from 'react';
import { NodeDataContext } from '../providers/nodeDataProvider';
import { NodeVersionData } from '../types';

type UseNodeDataReturnType = {
  currentNodeVersion?: NodeVersionData;
  currentLtsVersion?: NodeVersionData;
};

export const useNodeData = (): UseNodeDataReturnType => {
  const [currentNodeVersion, currentLtsVersion] = useContext(NodeDataContext);

  return {
    currentLtsVersion: currentLtsVersion || currentNodeVersion,
    currentNodeVersion,
  };
};
