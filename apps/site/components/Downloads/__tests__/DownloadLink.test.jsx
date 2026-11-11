import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { render, screen } from '@testing-library/react';

import DownloadLink from '#site/components/Downloads/DownloadLink';

const release = { versionWithPrefix: 'v22.0.0' };

describe('DownloadLink', () => {
  it('links to the source tarball without an OS', () => {
    render(<DownloadLink release={release}>Source</DownloadLink>);

    assert.match(
      screen.getByRole('link').getAttribute('href'),
      /\/v22\.0\.0\/node-v22\.0\.0\.tar\.gz$/
    );
  });

  it('links to the installer of the given OS and platform', () => {
    render(
      <DownloadLink release={release} os="WIN" platform="arm64">
        Installer
      </DownloadLink>
    );

    assert.match(
      screen.getByRole('link').getAttribute('href'),
      /\/node-v22\.0\.0-arm64\.msi$/
    );
  });
});
