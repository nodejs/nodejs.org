import { getUserBitnessByArchitecture } from '@/util/getUserBitnessByArchitecture';

describe('getUserBitnessByArchitecture', () => {
  it('should return "arm64" for arm architecture and 64-bit', () => {
    const result = getUserBitnessByArchitecture('arm', 64);
    expect(result).toBe('arm64');
  });

  it('should return the user bitness for other architectures', () => {
    const result = getUserBitnessByArchitecture('x86', 32);
    expect(result).toBe(32);
  });
});
