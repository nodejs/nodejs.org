import { render, screen } from '@testing-library/react';
import EditLink from './../index';
import {
  exampleAbsolutePath,
  exampleEditPath,
  exampleRelativePath,
  i18nMockDataEnglish,
  i18nMockDataNonEnglish,
} from './../mockDataConstants';
import { LocaleProvider } from './../../../../providers/localeProvider';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: '',
  })),
}));

describe('EditLink component', () => {
  it('Edit renders correctly', () => {
    const { container } = render(
      <LocaleProvider i18nData={i18nMockDataEnglish}>
        <EditLink relativePath={exampleRelativePath} />
      </LocaleProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('Translate renders correctly', () => {
    const { container } = render(
      <LocaleProvider i18nData={i18nMockDataNonEnglish}>
        <EditLink relativePath={exampleRelativePath} />
      </LocaleProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders without a relative path', () => {
    const { container } = render(
      <LocaleProvider i18nData={i18nMockDataEnglish}>
        <EditLink relativePath={undefined} />
      </LocaleProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('produces correct relative path', () => {
    render(
      <LocaleProvider i18nData={i18nMockDataEnglish}>
        <EditLink relativePath={exampleRelativePath} />
      </LocaleProvider>
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      exampleAbsolutePath
    );
  });

  it('produces correct edit path', () => {
    render(
      <LocaleProvider i18nData={i18nMockDataEnglish}>
        <EditLink editPath={exampleEditPath} />
      </LocaleProvider>
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      exampleAbsolutePath
    );
  });
});
