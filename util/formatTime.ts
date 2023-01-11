import strftime from 'strftime';

export const formatTime = (date: string, format: string) =>
  strftime(format || '%F', new Date(date));
