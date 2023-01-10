export const dateIsBetween = (startDate: string, endDate: string): boolean => {
  const invalidDateStr = 'Invalid Date';
  const start = new Date(startDate);
  const end = new Date(endDate);

  if ([start.toString(), end.toString()].includes(invalidDateStr)) {
    return false;
  }

  const now = new Date();

  return start < now && now < end;
};
