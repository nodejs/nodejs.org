import { render } from '@testing-library/react';
import Alert from '../index';

describe('Alert component', () => {
  it('should render correctly', () => {
    const { container } = render(<Alert />);

    expect(container).toMatchSnapshot();
  });

  it('should support passing children into the component', () => {
    const { container } = render(<Alert>This is an alert</Alert>);

    expect(container).toMatchSnapshot();
  });
});
