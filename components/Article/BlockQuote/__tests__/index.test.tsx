import { render } from '@testing-library/react';
import BlockQuote from '../index';

describe('BlockQuote component', () => {
  it('should render correctly', () => {
    const { container } = render(<BlockQuote />);

    expect(container).toMatchSnapshot();
  });

  it('should support passing children into the component', () => {
    const { container } = render(
      <BlockQuote>This is a block quote</BlockQuote>
    );

    expect(container).toMatchSnapshot();
  });

  it('should support passing multiple children into the component', () => {
    const { container } = render(
      <BlockQuote>
        <p>This is a block quote</p>
        <p>This is a block quote</p>
      </BlockQuote>
    );

    expect(container).toMatchSnapshot();
  });
});
