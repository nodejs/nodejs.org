import { getBitness } from '@/util/getBitness';

describe('getBitness', () => {
  it('returns the bitness value when available', async () => {
    const mockGetHighEntropyValues = jest
      .fn()
      .mockResolvedValue({ bitness: 64 });

    const mockNavigator = {
      userAgentData: { getHighEntropyValues: mockGetHighEntropyValues },
    };

    jest.spyOn(global, 'navigator', 'get').mockReturnValue(mockNavigator);

    const result = await getBitness();

    expect(result).toBe(64);
    expect(mockGetHighEntropyValues).toHaveBeenCalledWith(['bitness']);

    jest.restoreAllMocks();
  });

  it('returns undefined when navigator.userAgentData or getHighEntropyValues is not available', async () => {
    const mockNavigator = {};

    jest.spyOn(global, 'navigator', 'get').mockReturnValue(mockNavigator);

    const result = await getBitness();

    expect(result).toBeUndefined();

    jest.restoreAllMocks();
  });

  it('returns undefined when getHighEntropyValues fails', async () => {
    const mockGetHighEntropyValues = jest
      .fn()
      .mockRejectedValue(new Error('Some error'));

    const mockNavigator = {
      userAgentData: { getHighEntropyValues: mockGetHighEntropyValues },
    };

    jest.spyOn(global, 'navigator', 'get').mockReturnValue(mockNavigator);

    const result = await getBitness();

    expect(result).toBeUndefined();
    expect(mockGetHighEntropyValues).toHaveBeenCalledWith(['bitness']);

    jest.restoreAllMocks();
  });
});
