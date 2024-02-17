import { getAcronymFromString, twoDateToUIID } from '@/util/stringUtils';

describe('String utils', () => {
  it('getAcronymFromString returns the correct acronym', () => {
    expect(getAcronymFromString('John Doe')).toBe('JD');
  });

  it('getAcronymFromString returns the correct acronym for a single word', () => {
    expect(getAcronymFromString('John')).toBe('J');
  });

  it('getAcronymFromString if the string is empty, it returns NA', () => {
    expect(getAcronymFromString('')).toBe('');
  });

  it('twoDateToUIID returns the correct UUID', () => {
    const date = '2024-01-01T00:00:00.000Z';
    const date2 = '2024-01-01T00:00:00.000Z';
    expect(twoDateToUIID(date, date2)).toBe('2024-01-01-2024-01-01');
  });
});
