import assert from 'node:assert/strict';
import { beforeEach, describe, it, mock } from 'node:test';

import { act, render } from '@testing-library/react';
import { useState } from 'react';

import {
  ReleaseContext,
  ReleasesContext,
} from '#site/providers/releaseProvider';

const redirect = mock.fn();
const setVersion = mock.fn();
const Select = mock.fn(() => null);
let pathname;

mock.module('@node-core/ui-components/Common/Select/NoScriptSelect', {
  defaultExport: Select,
});

mock.module('#site/navigation.mjs', {
  namedExports: {
    redirect,
    usePathname: () => pathname,
  },
});

const { default: VersionDropdown } = await import('../VersionDropdown');

const statuses = [
  {
    status: 'EOL',
    path: '/download',
    badgeKind: 'error',
    versions: ['v18.0.0', 'v16.0.0'],
  },
  {
    status: 'Current',
    path: '/download/current',
    badgeKind: 'default',
    versions: ['v25.0.0', 'v25.1.0'],
  },
  {
    status: 'LTS',
    path: '/download',
    badgeKind: 'info',
    versions: ['v24.0.0', 'v22.0.0'],
  },
  {
    status: 'Alpha',
    path: '/download/alpha',
    badgeKind: 'warning',
    versions: ['v26.0.0-alpha.1', 'v26.0.0-alpha.2'],
  },
];

const releases = statuses.flatMap(({ status, versions }) =>
  versions.map(versionWithPrefix => ({ versionWithPrefix, status }))
);

const renderDropdown = (release = releases[0], allReleases = releases) => {
  const Dropdown = () => {
    const [version, updateVersion] = useState(release.versionWithPrefix);
    setVersion.mock.mockImplementation(updateVersion);

    return (
      <ReleaseContext
        value={{
          release: allReleases.find(
            candidate => candidate.versionWithPrefix === version
          ),
          setVersion,
        }}
      >
        <VersionDropdown />
      </ReleaseContext>
    );
  };

  render(
    <ReleasesContext value={{ releases: allReleases, snippets: [] }}>
      <Dropdown />
    </ReleasesContext>
  );

  return Select.mock.calls.at(-1).arguments[0];
};

describe('VersionDropdown', () => {
  beforeEach(() => {
    pathname = '/download';
    redirect.mock.resetCalls();
    setVersion.mock.resetCalls();
    Select.mock.resetCalls();
  });

  for (const { status, path, badgeKind, versions } of statuses) {
    describe(status, () => {
      const release = releases.find(candidate => candidate.status === status);

      beforeEach(() => {
        pathname = path;
      });

      it('uses the active release as the default selection', () => {
        const { defaultValue, ariaLabel } = renderDropdown(release);

        assert.equal(defaultValue, release.versionWithPrefix);
        assert.equal(ariaLabel, 'layouts.download.dropdown.version');
        assert.equal(redirect.mock.callCount(), 0);
      });

      it(`provides the ${status} badge for each version`, () => {
        const { values } = renderDropdown(release);

        assert.equal(values.length, releases.length);
        for (const version of versions) {
          assert.deepEqual(
            values.find(({ value }) => value === version),
            {
              value: version,
              label: version,
              badge: { label: status, kind: badgeKind },
            }
          );
        }
      });

      for (const target of statuses) {
        it(`normalizes ${target.path} on load for ${status}`, () => {
          pathname = target.path;

          renderDropdown(release);

          if (target.path !== path) {
            assert.deepEqual(
              redirect.mock.calls.map(call => call.arguments),
              [[{ href: path, locale: 'en' }]]
            );
          } else {
            assert.equal(redirect.mock.callCount(), 0);
          }
          assert.equal(setVersion.mock.callCount(), 0);
        });

        const description =
          target.status === status ? `another ${status}` : target.status;

        it(`switches to ${description}`, () => {
          const { onChange } = renderDropdown(release);
          redirect.mock.resetCalls();
          setVersion.mock.resetCalls();
          const version = target.versions.find(
            candidate => candidate !== release.versionWithPrefix
          );

          act(() => onChange(version));

          if (target.path !== path) {
            assert.equal(redirect.mock.callCount(), 1);
            assert.deepEqual(redirect.mock.calls[0].arguments, [
              { href: target.path, locale: 'en' },
            ]);
            assert.equal(setVersion.mock.callCount(), 0);
            assert.equal(Select.mock.callCount(), 1);
            assert.equal(
              Select.mock.calls.at(-1).arguments[0].defaultValue,
              release.versionWithPrefix
            );
          } else {
            assert.equal(redirect.mock.callCount(), 0);
            assert.equal(setVersion.mock.callCount(), 1);
            assert.deepEqual(setVersion.mock.calls[0].arguments, [version]);
            assert.equal(
              Select.mock.calls.at(-1).arguments[0].defaultValue,
              version
            );
          }
        });
      }
    });
  }

  it('provides the neutral badge for LTS versions in maintenance', () => {
    const release = {
      versionWithPrefix: 'v22.0.0',
      status: 'LTS',
      isMaintenance: true,
    };

    const { values } = renderDropdown(release, [release]);

    assert.deepEqual(values, [
      {
        value: 'v22.0.0',
        label: 'v22.0.0',
        badge: { label: 'LTS', kind: 'neutral' },
      },
    ]);
  });
});
