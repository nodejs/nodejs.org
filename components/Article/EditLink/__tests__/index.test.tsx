import { render, screen } from '@testing-library/react';
import EditLink from './../index';
import { LocaleProvider } from '../../../../providers/localeProvider';
import type { AppProps } from '../../../../types';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: '',
  })),
}));

const absolutePath =
  'https://github.com/nodejs/nodejs.org/edit/major/website-redesign/pages/en/get-involved/contribute.md';
const relativePath = 'get-involved/contribute.md';
const editPath = 'pages/en/get-involved/contribute.md';

const i18nDataEditMode = {
  currentLocale: {
    code: 'en',
  },
  localeMessages: {
    'components.article.editLink.title.edit': 'Edit this page on GitHub',
  },
} as unknown as AppProps['i18nData'];

describe('EditLink component', () => {
  it('produces correct relative path', () => {
    render(
      <LocaleProvider i18nData={i18nDataEditMode}>
        <EditLink relativePath={relativePath} />
      </LocaleProvider>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', absolutePath);
  });

  it('produces correct edit path', () => {
    render(
      <LocaleProvider i18nData={i18nDataEditMode}>
        <EditLink editPath={editPath} />
      </LocaleProvider>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', absolutePath);
  });
});
