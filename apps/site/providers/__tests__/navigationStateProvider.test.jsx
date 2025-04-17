import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render } from '@testing-library/react';

import { NavigationStateProvider } from '@/providers/navigationStateProvider';

describe('NavigationStateProvider', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <NavigationStateProvider>
        <div />
      </NavigationStateProvider>
    );

    assert.ok(container);
  });

  it('should provide navigation state context', () => {
    const { getByText } = render(
      <NavigationStateProvider>
        <div>Navigation State</div>
      </NavigationStateProvider>
    );

    assert.ok(getByText('Navigation State'));
  });
});
