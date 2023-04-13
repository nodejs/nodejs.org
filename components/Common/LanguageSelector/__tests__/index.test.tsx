import { fireEvent, render } from '@testing-library/react';
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
    const { getByRole, queryByText } = render(<LanguageSelector />);
    const button = getByRole('button');
    expect(queryByText('English')).not.toBeVisible();
    fireEvent.click(button);
    expect(queryByText('English')).toBeVisible();
    fireEvent.click(button);
    expect(queryByText('English')).not.toBeVisible();
  });

  test('renders the Dropdown component with correct style', () => {
    const { container }: { container: HTMLElement } = render(
      <LanguageSelector />
    );
    expect(container?.firstChild?.lastChild).toHaveStyle(
      'position: absolute; top: 60%; right: 0; margin: 0;'
    );
  });
});
