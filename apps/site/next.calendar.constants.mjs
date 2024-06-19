'use strict';

/**
 * This is used for Node.js Calendar and any other Google Calendar that we might want to load within the Website
 *
 * Note that this is a custom Environment Variable that can be defined by us when necessary
 */
export const BASE_CALENDAR_URL =
  process.env.NEXT_PUBLIC_CALENDAR_URL ||
  `https://clients6.google.com/calendar/v3/calendars/`;

/**
 * This is a shared (public) Google Calendar Key (accessible on the Web) for accessing Google's Public Calendar API
 *
 * This is a PUBLIC available API Key and not a Secret; It's exposed by Google on their Calendar API Docs
 *
 * Note that this is a custom Environment Variable that can be defined by us when necessary
 */
export const SHARED_CALENDAR_KEY =
  process.env.NEXT_PUBLIC_SHARED_CALENDAR_KEY ||
  'AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs';

/**
 * This is Node.js's Public Google Calendar ID used for all public entries from Node.js Calendar
 */
export const CALENDAR_NODEJS_ID =
  'nodejs.org_nr77ama8p7d7f9ajrpnu506c98@group.calendar.google.com';

/**
 * Default Date format for Calendars and Time Components
 *
 * @type {import('next-intl').DateTimeFormatOptions}
 */
export const DEFAULT_DATE_FORMAT = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
};
