import { useContext } from 'react';
import { NodeReleasesDataContext } from '../providers/nodeReleasesDataProvider';

export const useNodeReleasesData = () => {
  const { nodeReleasesData, lts, current } = useContext(
    NodeReleasesDataContext
  );

  return {
    nodeReleasesData: nodeReleasesData,
    lts: lts,
    current: current,
  };
};
