import { render } from '@testing-library/react';

import { ReleaseProvider, ReleasesProvider } from '@/providers/releaseProvider';

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

    expect(container).toBeDefined();
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

    expect(getByText('Child Provider')).toBeDefined();
  });
});
