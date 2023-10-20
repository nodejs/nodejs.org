import { shortHumanReadableDate } from '@/util/shortHumanReadableDate';

describe('shortHumanReadableDate', () => {
  it('Returns "20 Oct 2023" when passed "20-10-2023" date and "en-GB" locale', () => {
    const date = new Date('10-20-2023');

    expect(shortHumanReadableDate(date, 'en-GB')).toBe('20 Oct 2023');
  });

  it('Returns "Oct 20, 2023" when passed "20-10-2023" date and "en-US" locale', () => {
    const date = new Date('10-20-2023');

    expect(shortHumanReadableDate(date, 'en-US')).toBe('Oct 20, 2023');
  });

  it('Returns "20 oct 2023" when passed "20-10-2023" date and "es" locale', () => {
    const date = new Date('10-20-2023');

    expect(shortHumanReadableDate(date, 'es')).toBe('20 oct 2023');
  });
});
