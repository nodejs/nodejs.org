import { render } from '@testing-library/react';

import { LocaleProvider } from '@/providers/localeProvider';

jest.mock('next-intl', () => ({
  useMessages: jest.fn(() => ({ 'en-US': { greeting: 'Hello!' } })),
  NextIntlClientProvider: ({ children }) => children,
  useTimeZone: jest.fn(() => 'UTC'),
}));

describe('LocaleProvider', () => {
  it('renders children with messages and timeZone', () => {
    const { getByText } = render(
      <LocaleProvider>
        <div>Child Component</div>
      </LocaleProvider>
    );

    expect(getByText('Child Component')).toBeInTheDocument();

    expect(require('next-intl').useMessages).toHaveBeenCalled();
    expect(require('next-intl').useTimeZone).toHaveBeenCalled();
  });
});
