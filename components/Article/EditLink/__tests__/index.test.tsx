import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import EditLink from './../index';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: '',
  })),
}));

const absolutePath =
  'https://github.com/nodejs/nodejs.org/edit/major/website-redesign/pages/en/get-involved/contribute.md';
const relativePath = 'get-involved/contribute.md';
const editPath = 'pages/en/get-involved/contribute.md';

describe('EditLink component', () => {
  it('produces correct relative path', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <EditLink relativePath={relativePath} />
      </IntlProvider>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', absolutePath);
  });

  it('produces correct edit path', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <EditLink editPath={editPath} />
      </IntlProvider>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', absolutePath);
  });
});
