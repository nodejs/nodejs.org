import type {
  NodeRelease,
  NodeReleaseStatus,
  NodeReleaseSupport,
} from '../types/releases';

export const isNodeRelease = (release: any): release is NodeRelease =>
  typeof release === 'object' && release?.version;

export const getNodeReleaseStatus = (
  now: Date,
  support: NodeReleaseSupport
): NodeReleaseStatus => {
  if (support.endOfLife) {
    if (now > new Date(support.endOfLife)) {
      return 'End-of-life';
    }
  }

  if (support.maintenanceStart) {
    if (now > new Date(support.maintenanceStart)) {
      return 'Maintenance LTS';
    }
  }

  if (support.ltsStart) {
    if (now > new Date(support.ltsStart)) {
      return 'Active LTS';
    }
  }

  if (support.currentStart) {
    if (now >= new Date(support.currentStart)) {
      return 'Current';
    }
  }

  return 'Pending';
};
