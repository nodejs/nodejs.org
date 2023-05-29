import { renderHook, waitFor } from '@testing-library/react';
import { useDownloadLink } from '../useDownloadLink';

const mockNavigator = {
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
  userAgentData: {
    getHighEntropyValues: jest.fn().mockResolvedValue({ bitness: '64' }),
  },
};

const originalNavigator = global.navigator;

describe('useDownloadLink', () => {
  afterEach(() => {
    // Reset the navigator global to the original value
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
  });

  it('should detect the user OS and bitness', async () => {
    Object.defineProperty(global, 'navigator', {
      value: mockNavigator,
      // Allow us to change the value of navigator for the other tests
      writable: true,
    });

    const { result } = renderHook(() =>
      useDownloadLink({ version: 'v18.16.0' })
    );

    await waitFor(() => {
      expect(result.current).toBe(
        'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi'
      );
    });

    expect(
      mockNavigator.userAgentData.getHighEntropyValues
    ).toHaveBeenCalledWith(['bitness']);
  });

  it('should return the default url if global.navigator does not exist', async () => {
    Object.defineProperty(global, 'navigator', {
      value: undefined,
      // Allow us to change the value of navigator for the other tests
      writable: true,
    });

    const { result } = renderHook(() =>
      useDownloadLink({ version: 'v20.1.0' })
    );

    await waitFor(() => {
      expect(result.current).toBe(
        'https://nodejs.org/dist/v20.1.0/node-v20.1.0.tar.gz'
      );
    });
  });
});
