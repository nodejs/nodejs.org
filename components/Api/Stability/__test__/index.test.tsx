import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Stability from '..';

describe('Stability', () => {
  it('should render correctly', () => {
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <Stability stability={0} />
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <Stability stability={1} />
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <Stability stability={2} />
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <Stability stability={3} />
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
