import { renderHook, waitFor } from '@testing-library/react';
import { useDetectOs } from '../useDetectOS';

const mockNavigator = {
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
  userAgentData: {
    getHighEntropyValues: jest.fn().mockResolvedValue({ bitness: '64' }),
  },
};

describe('useDetectOs', () => {
  it('should detect the user OS and bitness', async () => {
    Object.defineProperty(global, 'navigator', {
      value: mockNavigator,
      writable: true,
    });

    const { result } = renderHook(() => useDetectOs());

    await waitFor(() => {
      expect(result.current.userOS).toBe('WIN');
    });

    await waitFor(() => {
      expect(result.current.getDownloadLink('v18.16.0')).toBe(
        'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi'
      );
    });

    expect(
      mockNavigator.userAgentData.getHighEntropyValues
    ).toHaveBeenCalledWith(['bitness']);
  });
});
