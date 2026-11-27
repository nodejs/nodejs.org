import assert from 'node:assert/strict';
import { beforeEach, describe, it, mock } from 'node:test';

import { act, render } from '@testing-library/react';
import { useState } from 'react';

import { ReleaseContext } from '#site/providers/releaseProvider';

const Select = mock.fn(() => null);
let setOS;
let setVersion;

mock.module('@node-core/ui-components/Common/Select', {
  defaultExport: Select,
});

const { default: InstallationMethodDropdown } =
  await import('../InstallationMethodDropdown');

const renderDropdown = (initialOS, initialMethod = '') => {
  const Dropdown = () => {
    const [os, updateOS] = useState(initialOS);
    const [version, updateVersion] = useState('v24.0.0');
    const [installMethod, setInstallMethod] = useState(initialMethod);
    setOS = updateOS;
    setVersion = updateVersion;

    return (
      <ReleaseContext
        value={{
          os,
          version,
          installMethod,
          platform: 'x64',
          release: { status: version.includes('alpha') ? 'Alpha' : 'LTS' },
          setInstallMethod,
        }}
      >
        <InstallationMethodDropdown />
      </ReleaseContext>
    );
  };

  render(<Dropdown />);
};

const selectedValue = () => Select.mock.calls.at(-1).arguments[0].value;

describe('InstallationMethodDropdown', () => {
  beforeEach(() => {
    Select.mock.resetCalls();
  });

  it('selects the first available displayed method after an OS change', () => {
    renderDropdown('MAC');
    assert.equal(selectedValue(), 'NVM');

    act(() => setOS('WIN'));

    const { values, value } = Select.mock.calls.at(-1).arguments[0];
    assert.equal(
      value,
      values.flatMap(group => group.items).find(item => !item.disabled).value
    );
    assert.equal(value, 'FNM');
  });

  it('keeps a compatible community method when the OS changes', () => {
    renderDropdown('MAC', 'BREW');

    act(() => setOS('LINUX'));

    assert.equal(selectedValue(), 'BREW');
  });

  it('selects the first available displayed method after a version change', () => {
    renderDropdown('WIN', 'CHOCO');

    act(() => setVersion('v27.0.0-alpha.1'));

    assert.equal(selectedValue(), 'FNM');
  });
});
