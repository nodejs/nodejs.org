export const getNodeReleaseStatus = (
  now: Date,
  currentStart?: string,
  ltsStart?: string,
  maintenanceStart?: string,
  endOfLife?: string
) => {
  if (endOfLife) {
    if (now > new Date(endOfLife)) {
      return 'End-of-life';
    }
  }

  if (maintenanceStart) {
    if (now > new Date(maintenanceStart)) {
      return 'Maintenance LTS';
    }
  }

  if (ltsStart) {
    if (now > new Date(ltsStart)) {
      return 'Active LTS';
    }
  }

  if (currentStart) {
    if (now >= new Date(currentStart)) {
      return 'Current';
    }
  }

  return 'Pending';
};
