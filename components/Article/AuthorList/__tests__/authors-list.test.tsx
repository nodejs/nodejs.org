import React from 'react';
import { render } from '@testing-library/react';
import AuthorsList from '..';
import { IntlProvider } from 'react-intl';

describe('AuthorsList component', () => {
  it('renders correctly', () => {
    const authors = ['test-author', 'another-test-author'];
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <AuthorsList authors={authors} />
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
