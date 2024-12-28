import { getHighEntropyValues } from '@/util/getHighEntropyValues';

describe('getHighEntropyValues', () => {
  it('should retrieve high entropy values', async () => {
    const mockGetHighEntropyValues = jest.fn().mockResolvedValue({
      bitness: '64',
      architecture: 'x86',
    });

    Object.defineProperty(navigator, 'userAgentData', {
      value: {
        getHighEntropyValues: mockGetHighEntropyValues,
      },
      writable: true,
    });

    const result = await getHighEntropyValues(['bitness', 'architecture']);

    expect(result).toEqual({
      bitness: '64',
      architecture: 'x86',
    });
    expect(mockGetHighEntropyValues).toHaveBeenCalledWith(['bitness', 'architecture']);
  });

  it('should handle missing high entropy values gracefully', async () => {
    const mockGetHighEntropyValues = jest.fn().mockResolvedValue({});

    Object.defineProperty(navigator, 'userAgentData', {
      value: {
        getHighEntropyValues: mockGetHighEntropyValues,
      },
      writable: true,
    });

    const result = await getHighEntropyValues(['bitness', 'architecture']);

    expect(result).toEqual({
      bitness: undefined,
      architecture: undefined,
    });
    expect(mockGetHighEntropyValues).toHaveBeenCalledWith(['bitness', 'architecture']);
  });

  it('should handle absence of getHighEntropyValues method gracefully', async () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: {},
      writable: true,
    });

    const result = await getHighEntropyValues(['bitness', 'architecture']);

    expect(result).toEqual({
      bitness: undefined,
      architecture: undefined,
    });
  });

  it('should handle invalid inputs gracefully', async () => {
    const result = await getHighEntropyValues(null);

    expect(result).toEqual({});
  });
});
