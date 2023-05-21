export const getNodeReleaseStatus = (
  now: Date,
  currentStart?: string,
  ltsStart?: string,
  maintenanceStart?: string,
  endOfLife?: string
) => {
  if (endOfLife) {
    const endOfLifeDate = new Date(endOfLife);
    if (now > endOfLifeDate) {
      return 'End-of-life';
    }
  }

  if (maintenanceStart) {
    const maintenanceStartDate = new Date(maintenanceStart);
    if (now > maintenanceStartDate) {
      return 'Maintenance LTS';
    }
  }

  if (ltsStart) {
    const ltsStartDate = new Date(ltsStart);
    if (now > ltsStartDate) {
      return 'Active LTS';
    }
  }

  if (currentStart) {
    const currentStartDate = new Date(currentStart);
    if (now >= currentStartDate) {
      return 'Current';
    }
  }

  return 'Pending';
};
