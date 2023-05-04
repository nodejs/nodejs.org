import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import LanguageSelector from '..';

jest.mock('../../../../hooks/useLocale', () => ({
  useLocale: () => ({
    availableLocales: [
      { code: 'en', name: 'English', localName: 'English' },
      { code: 'es', name: 'Spanish', localName: 'Español' },
    ],
    currentLocale: { code: 'en', name: 'English', localName: 'English' },
  }),
}));

describe('LanguageSelector', () => {
  test('clicking the language switch button toggles the dropdown display', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <LanguageSelector />
      </IntlProvider>
    );
    const button = screen.getByRole('button');
    expect(screen.queryByText('English')).not.toBeVisible();
    fireEvent.click(button);
    expect(screen.queryByText('English')).toBeVisible();
    fireEvent.click(button);
    expect(screen.queryByText('English')).not.toBeVisible();
  });

  test('renders the Dropdown component with correct style', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <LanguageSelector />
      </IntlProvider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const dropdown = screen.getByRole('list');
    expect(dropdown).toHaveStyle(
      'position: absolute; top: 60%; right: 0; margin: 0;'
    );
  });
});
