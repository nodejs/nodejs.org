import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';

import { renderHook, waitFor } from '@testing-library/react';

import useDetectOS from '@/hooks/react-client/useDetectOS';

const windowsUserAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';

const macUserAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';

const originalNavigator = global.navigator;

describe('useDetectOS', () => {
  afterEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
  });

  it('should detect WIN OS and 64 bitness', async () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgent: windowsUserAgent,
        userAgentData: {
          getHighEntropyValues: () => ({ bitness: '64' }),
        },
      },
      writable: true,
    });

    const { result } = renderHook(() => useDetectOS());

    await waitFor(() => {
      assert.deepEqual(result.current, {
        os: 'WIN',
        bitness: '64',
        architecture: 'x86',
      });
    });
  });

  it('should detect WIN OS and 64 bitness from user agent', async () => {
    Object.defineProperty(global, 'navigator', {
      value: { userAgent: windowsUserAgent },
      writable: true,
    });

    const { result } = renderHook(() => useDetectOS());

    await waitFor(() => {
      assert.deepEqual(result.current, {
        os: 'WIN',
        bitness: '64',
        architecture: 'x86',
      });
    });
  });

  it('should detect MAC OS and default bitness', async () => {
    Object.defineProperty(global, 'navigator', {
      value: { userAgent: macUserAgent },
      writable: true,
    });

    const { result } = renderHook(() => useDetectOS());

    await waitFor(() => {
      assert.deepEqual(result.current, {
        os: 'MAC',
        bitness: '32',
        architecture: 'x86',
      });
    });
  });
});
