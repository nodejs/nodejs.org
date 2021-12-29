'use strict';

module.exports = (startDate, endDate) => {
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);
  const now = Date.now();

  if (!(parsedStartDate instanceof Date && isFinite(parsedStartDate))) {
    // If date is invalid (but not undefined) log error for debugging
    if (startDate && process.env.NODE_ENV !== 'test') {
      console.error(
        '[handlebars] betweenDate - Invalid start date:',
        startDate
      );
    }
    return false;
  }
  if (!(parsedEndDate instanceof Date && isFinite(parsedEndDate))) {
    // If date is invalid (but not undefined) log error for debugging
    if (endDate && process.env.NODE_ENV !== 'test') {
      console.error('[handlebars] betweenDate - Invalid end date:', endDate);
    }
    return false;
  }

  return parsedStartDate < now && now < parsedEndDate;
};
