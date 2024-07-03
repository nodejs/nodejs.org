'use strict';

import {
  BASE_CALENDAR_URL,
  SHARED_CALENDAR_KEY,
} from './next.calendar.constants.mjs';

/**
 *
 * @param {string} calendarId
 * @param {number} maxResults
 * @returns {Promise<Array<import('./types').CalendarEvent>>}
 */
export const getCalendarEvents = async (calendarId = '', maxResults = 20) => {
  const currentDate = new Date();
  const nextWeekDate = new Date();

  nextWeekDate.setDate(currentDate.getDate() + 7);

  const calendarQueryParams = new URLSearchParams({
    calendarId,
    maxResults,
    singleEvents: true,
    timeZone: 'Etc/Utc',
    key: SHARED_CALENDAR_KEY,
    timeMax: nextWeekDate.toISOString(),
    timeMin: currentDate.toISOString(),
  });

  const calendarQueryUrl = new URL(`${BASE_CALENDAR_URL}${calendarId}/events`);

  calendarQueryParams.forEach((value, key) =>
    calendarQueryUrl.searchParams.append(key, value)
  );

  return fetch(calendarQueryUrl.toString())
    .then(response => response.json())
    .then(calendar => calendar.items);
};
