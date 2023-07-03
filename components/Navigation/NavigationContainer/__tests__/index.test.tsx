import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import NavigationContainer from '../';
import type { FC } from 'react';

const NavigationContent: FC = () => (
  <ul>
    <li>Navigation item 1</li>
    <li>Navigation item 2</li>
    <li>Navigation item 3</li>
  </ul>
);

describe('Navigation component', (): void => {
  it('utilizes click handler correctly', async () => {
    const mockHandler = jest.fn();

    render(
      <IntlProvider locale="en" onError={() => {}}>
        <NavigationContainer
          isOpen={false}
          toggleNavigation={mockHandler}
          label="Navigation"
        >
          <ul>
            <li>Navigation item 1</li>
            <li>Navigation item 2</li>
            <li>Navigation item 3</li>
          </ul>
        </NavigationContainer>
      </IntlProvider>
    );

    await userEvent.click(
      screen.getByText('components.navigation.navigationContainer')
    );

    expect(mockHandler.mock.calls.length).toBe(1);
  });
});
