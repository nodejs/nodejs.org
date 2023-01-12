import { useContext } from 'react';
import { NodeDataContext } from '../providers/nodeDataProvider';

export const useNodeData = () => {
  const nodeDataContext = useContext(NodeDataContext);

  const currentNodeVersion = nodeDataContext[0];
  const currentLtsVersion = nodeDataContext.find(version => version.isLts);

  return {
    availableNodeVersions: nodeDataContext,
    currentLtsVersion: currentLtsVersion || currentNodeVersion,
    currentNodeVersion,
  };
};
