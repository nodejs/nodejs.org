import { getHighEntropyValues } from '@/util/getHighEntropyValues';

describe('getHighEntropyValues', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgentData: {
          getHighEntropyValues: jest
            .fn()
            .mockResolvedValue({ platform: 'Win32', architecture: 'x86' }),
        },
      },
      configurable: true,
    });
  });

  it('should resolve and return hint values', async () => {
    const hints = ['platform'];
    const result = await getHighEntropyValues(hints);
    expect(result.platform).toBe('Win32');
  });

  it('should return an empty object on rejection', async () => {
    navigator.userAgentData.getHighEntropyValues.mockRejectedValue(null);
    const hints = ['platform'];
    const result = await getHighEntropyValues(hints);
    expect(result.platform).toBeUndefined();
  });

  it('should return multiple hint values', async () => {
    const hints = ['platform', 'architecture'];
    const result = await getHighEntropyValues(hints);
    expect(result.platform).toBe('Win32');
    expect(result.architecture).toBe('x86');
  });

  it('should return undefined for unsupported hints', async () => {
    const hints = ['unsupportedHint'];
    const result = await getHighEntropyValues(hints);
    expect(result.unsupportedHint).toBeUndefined();
  });
});
