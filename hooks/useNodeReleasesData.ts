import { useContext } from 'react';
import { NodeReleasesDataContext } from '../providers/nodeReleasesDataProvider';

export const useNodeReleasesData = () => useContext(NodeReleasesDataContext);
