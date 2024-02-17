import { getBitness } from '@/util/getBitness';

describe('getBitness', () => {
  it('returns the bitness value when available', async () => {
    const mockGetHighEntropyValues = jest
      .fn()
      .mockResolvedValue({ bitness: 64 });

    Object.defineProperty(navigator, 'userAgentData', {
      value: { getHighEntropyValues: mockGetHighEntropyValues },
      configurable: true,
    });

    const result = await getBitness();

    expect(result).toBe(64);
    expect(mockGetHighEntropyValues).toHaveBeenCalledWith(['bitness']);
  });

  it('returns undefined when navigator.userAgentData or getHighEntropyValues is not available', async () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: undefined,
      configurable: true,
    });

    const result = await getBitness();

    expect(result).toBeUndefined();
  });

  it('returns undefined when getHighEntropyValues fails', async () => {
    const mockGetHighEntropyValues = jest
      .fn()
      .mockRejectedValue(new Error('Some error'));

    Object.defineProperty(navigator, 'userAgentData', {
      value: { getHighEntropyValues: mockGetHighEntropyValues },
      configurable: true,
    });

    const result = await getBitness();

    expect(result).toBeUndefined();
    expect(mockGetHighEntropyValues).toHaveBeenCalledWith(['bitness']);
  });
});
