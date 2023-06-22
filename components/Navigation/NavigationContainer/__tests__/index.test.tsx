import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import NavigationContainer from '../';

describe('Navigation component', (): void => {
  let isOpen: boolean;
  let label: string;

  beforeEach(() => {
    isOpen = false;
    label = 'API Navigation';
  });

  it('utilizes click handler correctly', async () => {
    const mockHandler = jest.fn();

    render(
      <IntlProvider locale="en" onError={() => {}}>
        <NavigationContainer
          isOpen={isOpen}
          toggleNavigation={mockHandler}
          label={label}
        >
          <div>Navigation content</div>
        </NavigationContainer>
      </IntlProvider>
    );

    await userEvent.click(
      screen.getByText('components.navigation.navigationContainer')
    );

    expect(mockHandler.mock.calls.length).toBe(1);
  });
});
