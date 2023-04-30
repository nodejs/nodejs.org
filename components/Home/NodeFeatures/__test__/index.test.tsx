import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import NodeFeatures from '../index';

describe('NodeFeatures', () => {
  it('should render', () => {
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <NodeFeatures />
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
