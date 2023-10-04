import { fallbackAltAsAvatar } from '../';

describe('Fallback', () => {
  it('should return the first letter of the first and last name', () => {
    const fallback = fallbackAltAsAvatar('augustin mauroy');
    const expected = 'AM';
    expect(fallback).toEqual(expected);
  });

  it('if the name is empty, should return an empty string', () => {
    const fallback = fallbackAltAsAvatar('');
    const expected = '';
    expect(fallback).toEqual(expected);
  });

  it('if the name is one word, should return the first letter of the word', () => {
    const fallback = fallbackAltAsAvatar('augustin');
    const expected = 'A';
    expect(fallback).toEqual(expected);
  });
});
