import { getUserPlatform } from '@/util/getUserPlatform';

describe('getUserPlatform', () => {
  it('should return arm64 for arm architecture and 64 bitness', () => {
    const result = getUserPlatform('arm', '64');
    expect(result).toBe('arm64');
  });

  it('should return x64 for 64 bitness', () => {
    const result = getUserPlatform('', '64');
    expect(result).toBe('x64');
  });

  it('should return x86 for 32 bitness', () => {
    const result = getUserPlatform('', '32');
    expect(result).toBe('x86');
  });

  it('should return x86 for unknown bitness', () => {
    const result = getUserPlatform('', '');
    expect(result).toBe('x86');
  });

  it('should return x64 for Windows platform', () => {
    const result = getUserPlatform('win', '64');
    expect(result).toBe('x64');
  });

  it('should return x64 for Mac platform', () => {
    const result = getUserPlatform('mac', '64');
    expect(result).toBe('x64');
  });

  it('should return x86 for unknown platform', () => {
    const result = getUserPlatform('unknown', '32');
    expect(result).toBe('x86');
  });
});
