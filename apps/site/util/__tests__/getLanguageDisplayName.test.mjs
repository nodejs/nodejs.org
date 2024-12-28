import { getLanguageDisplayName } from '@/util/getLanguageDisplayName';

describe('getLanguageDisplayName', () => {
  it('should return the display name for a valid language', () => {
    const result = getLanguageDisplayName('javascript');
    expect(result).toBe('JavaScript');
  });

  it('should return the input language if no display name is found', () => {
    const result = getLanguageDisplayName('unknownLanguage');
    expect(result).toBe('unknownLanguage');
  });

  it('should handle case-insensitive language input', () => {
    const result = getLanguageDisplayName('JAVASCRIPT');
    expect(result).toBe('JavaScript');
  });

  it('should return the display name for a valid language alias', () => {
    const result = getLanguageDisplayName('js');
    expect(result).toBe('JavaScript');
  });
});
