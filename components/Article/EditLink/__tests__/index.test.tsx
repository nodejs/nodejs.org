import React from 'react';
import { render, screen } from '@testing-library/react';
import EditLink from './../index';
import { AppProps } from './../../../../types';
import { LocaleProvider } from './../../../../providers/localeProvider';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: '',
  })),
}));

const i18nData = {
  currentLocale: {
    code: 'en',
  },
  localeMessages: {
    'components.article.editLink.title': 'Edit this page on GitHub',
  },
} as unknown as AppProps['i18nData'];

const absolutePath =
  'https://github.com/nodejs/nodejs.org/edit/major/website-redesign/pages/en/get-involved/contribute.md';
const relativePath = 'get-involved/contribute.md';
const editPath = 'pages/en/get-involved/contribute.md';
const resultPath = absolutePath;

describe('EditLink component', () => {
  it('renders correctly', () => {
    const path = 'get-involved/contribute.md';
    const { container } = render(
      <LocaleProvider i18nData={i18nData}>
        <EditLink relativePath={path} />
      </LocaleProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders without a relative path', () => {
    const { container } = render(
      <LocaleProvider i18nData={i18nData}>
        <EditLink relativePath={undefined} />
      </LocaleProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('produces correct absolute path', () => {
    render(
      <LocaleProvider i18nData={i18nData}>
        <EditLink absolutePath={absolutePath} />
      </LocaleProvider>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', resultPath);
  });

  it('produces correct relative path', () => {
    render(
      <LocaleProvider i18nData={i18nData}>
        <EditLink relativePath={relativePath} />
      </LocaleProvider>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', resultPath);
  });

  it('produces correct edit path', () => {
    render(
      <LocaleProvider i18nData={i18nData}>
        <EditLink editPath={editPath} />
      </LocaleProvider>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', resultPath);
  });
});
