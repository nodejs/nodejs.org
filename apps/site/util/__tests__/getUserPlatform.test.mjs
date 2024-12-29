import { getUserPlatform } from '@/util/getUserPlatform';

describe('getUserPlatform', () => {
  it('should return arm64 for arm + 64', () => {
    expect(getUserPlatform('arm', '64')).toBe('arm64');
  });

  it('should return x64 for non-arm + 64', () => {
    expect(getUserPlatform('amd64', '64')).toBe('x64');
  });

  it('should return x86 otherwise', () => {
    expect(getUserPlatform('amd64', '32')).toBe('x86');
  });
});
