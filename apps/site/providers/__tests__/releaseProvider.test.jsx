import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render } from '@testing-library/react';

import {
  ReleaseProvider,
  ReleasesProvider,
} from '#site/providers/releaseProvider';

describe('ReleaseProvider', () => {
  it('should render without crashing', () => {
    const initialRelease = { versionWithPrefix: 'v14.17.0' };
    const releases = [initialRelease];
    const snippets = [];

    const { container } = render(
      <ReleasesProvider releases={releases} snippets={snippets}>
        <ReleaseProvider initialRelease={initialRelease}>
          <div />
        </ReleaseProvider>
      </ReleasesProvider>
    );

    assert.ok(container);
  });

  it('should set version from parent provider', () => {
    const initialRelease = { versionWithPrefix: 'v14.17.0' };
    const releases = [initialRelease];
    const snippets = [];

    const { getByText } = render(
      <ReleasesProvider releases={releases} snippets={snippets}>
        <ReleaseProvider initialRelease={initialRelease}>
          <ReleaseProvider>
            <div>Child Provider</div>
          </ReleaseProvider>
        </ReleaseProvider>
      </ReleasesProvider>
    );

    assert.ok(getByText('Child Provider'));
  });
});

describe('ReleaseProvider with a detected OS', () => {
  it('selects the detected OS and platform', async () => {
    const { DetectedOSContext } =
      await import('#site/providers/detectedOSProvider');
    const { ReleaseContext } = await import('#site/providers/releaseProvider');
    const { use } = await import('react');

    const Selection = () => {
      const { os, platform } = use(ReleaseContext);

      return <span>{`${os}/${platform}`}</span>;
    };

    const initialRelease = { versionWithPrefix: 'v14.17.0' };

    const { findByText } = render(
      <DetectedOSContext
        value={{ os: 'MAC', architecture: 'arm', bitness: '64' }}
      >
        <ReleasesProvider releases={[initialRelease]} snippets={[]}>
          <ReleaseProvider initialRelease={initialRelease}>
            <Selection />
          </ReleaseProvider>
        </ReleasesProvider>
      </DetectedOSContext>
    );

    assert.ok(await findByText('MAC/arm64'));
  });
});
