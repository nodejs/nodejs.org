import { render } from '@testing-library/react';

import { NavigationStateProvider } from '@/providers/navigationStateProvider';

describe('NavigationStateProvider', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <NavigationStateProvider>
        <div />
      </NavigationStateProvider>
    );

    expect(container).toBeDefined();
  });

  it('should provide navigation state context', () => {
    const { getByText } = render(
      <NavigationStateProvider>
        <div>Navigation State</div>
      </NavigationStateProvider>
    );

    expect(getByText('Navigation State')).toBeDefined();
  });
});
