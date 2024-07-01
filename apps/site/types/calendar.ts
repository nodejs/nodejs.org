export interface ZonedCalendarTime {
  dateTime: string;
  timeZone: string;
}

export interface SimpleCalendarTime {
  date: string;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  location?: string;
  creator: string;
  start: ZonedCalendarTime | SimpleCalendarTime;
  end: ZonedCalendarTime | SimpleCalendarTime;
  htmlLink: string;
  description?: string;
}
