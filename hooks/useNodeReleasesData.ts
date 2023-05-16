import { useContext } from 'react';
import { NodeReleasesDataContext } from '../providers/nodeReleasesDataProvider';

export const useNodeReleasesData = () => {
  const { releases, lts, current } = useContext(NodeReleasesDataContext);

  return {
    releases: releases,
    lts: lts,
    current: current,
  };
};
