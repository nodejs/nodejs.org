import React from 'react';
import { IntlProvider } from 'react-intl';
import messages from '../../../i18n/locales/en.json';

const {
  render: rtlRender,
  screen,
  fireEvent,
  waitFor,
} = jest.requireActual('@testing-library/react');

const render = (
  ui: React.ReactElement,
  { locale = 'en', ...renderOptions } = {}
) => {
  const ProviderComponent = ({ children }: { children: React.ReactNode }) => (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );

  return rtlRender(ui, {
    wrapper: ProviderComponent,
    ...renderOptions,
  });
};

export { render, screen, fireEvent, waitFor };
