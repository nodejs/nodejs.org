import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import DownloadToggle from '..';

describe('DownloadToggle component', (): void => {
  it('utilizes click handler correctly', async () => {
    const mockHandler = jest.fn();

    render(
      <IntlProvider locale="en" onError={() => {}}>
        <DownloadToggle selected="LTS" handleClick={mockHandler} />
      </IntlProvider>
    );

    await userEvent.click(
      screen.getByText('components.downloads.downloadToggle.lts')
    );

    await userEvent.click(
      screen.getByText('components.downloads.downloadToggle.current')
    );

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
