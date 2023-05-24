import { useContext } from 'react';
import { NodeReleasesContext } from '../providers/nodeReleasesProvider';

export const useNodeReleases = () => useContext(NodeReleasesContext);
