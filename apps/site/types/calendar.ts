export type ZonedCalendarTime = {
  dateTime: string;
  timeZone: string;
};

export type SimpleCalendarTime = {
  date: string;
};

export type CalendarEvent = {
  id: string;
  summary: string;
  location?: string;
  creator: string;
  start: ZonedCalendarTime | SimpleCalendarTime;
  end: ZonedCalendarTime | SimpleCalendarTime;
  htmlLink: string;
  description?: string;
};
