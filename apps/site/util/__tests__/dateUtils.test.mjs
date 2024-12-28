import { dateIsBetween, formatDate, parseDate, isValidDate } from '@/util/dateUtils';

describe('dateIsBetween', () => {
  it('returns true when the current date is between start and end dates', () => {
    const startDate = '2022-01-01T00:00:00.000Z';
    const endDate = '2069-01-01T00:00:00.000Z';

    const result = dateIsBetween(startDate, endDate);

    expect(result).toBe(true);
  });

  it('returns false when the current date is not between start and end dates', () => {
    const startDate = '2010-01-01T00:00:00.000Z';
    const endDate = '2020-01-01T00:00:00.000Z';

    const result = dateIsBetween(startDate, endDate);

    expect(result).toBe(false);
  });

  it('throws when either start or end date is invalid', () => {
    const invalidStartDate = 'Invalid Start Date';
    const validEndDate = '2024-01-01T00:00:00.000Z';

    expect(() => dateIsBetween(invalidStartDate, validEndDate)).toThrow(
      'dateIsBetween got called with invalid dates'
    );
  });
});

describe('formatDate', () => {
  it('formats a valid date correctly', () => {
    const date = new Date('2024-02-17T00:00:00.000Z');
    const formattedDate = formatDate(date, 'yyyy-MM-dd');
    expect(formattedDate).toBe('2024-02-17');
  });

  it('throws an error for an invalid date', () => {
    const invalidDate = new Date('Invalid Date');
    expect(() => formatDate(invalidDate, 'yyyy-MM-dd')).toThrow('Invalid date');
  });
});

describe('parseDate', () => {
  it('parses a valid date string correctly', () => {
    const dateString = '2024-02-17';
    const parsedDate = parseDate(dateString, 'yyyy-MM-dd');
    expect(parsedDate).toEqual(new Date('2024-02-17T00:00:00.000Z'));
  });

  it('throws an error for an invalid date string', () => {
    const invalidDateString = 'Invalid Date';
    expect(() => parseDate(invalidDateString, 'yyyy-MM-dd')).toThrow('Invalid date string');
  });
});

describe('isValidDate', () => {
  it('returns true for a valid date', () => {
    const validDate = new Date('2024-02-17T00:00:00.000Z');
    expect(isValidDate(validDate)).toBe(true);
  });

  it('returns false for an invalid date', () => {
    const invalidDate = new Date('Invalid Date');
    expect(isValidDate(invalidDate)).toBe(false);
  });
});
