import { getLanguageDisplayName } from '@/util/getLanguageDisplayName';

jest.mock('@/shiki.config.mjs', () => ({
  LANGUAGES: [
    { name: 'javascript', aliases: ['js'], displayName: 'JavaScript' },
    { name: 'typescript', aliases: ['ts'], displayName: 'TypeScript' },
  ],
}));

describe('getLanguageDisplayName', () => {
  it('should return the display name for a known language', () => {
    expect(getLanguageDisplayName('javascript')).toBe('JavaScript');
    expect(getLanguageDisplayName('js')).toBe('JavaScript');
  });

  it('should return the display name for another known language', () => {
    expect(getLanguageDisplayName('typescript')).toBe('TypeScript');
    expect(getLanguageDisplayName('ts')).toBe('TypeScript');
  });

  it('should return the input language if it is not known', () => {
    expect(getLanguageDisplayName('unknown')).toBe('unknown');
  });
});
