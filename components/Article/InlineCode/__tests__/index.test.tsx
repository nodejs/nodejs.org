import { render } from '@testing-library/react';
import InlineCode from '../index';

describe('InlineCode component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <InlineCode>
        <code>const a = 1;</code>
      </InlineCode>
    );

    expect(container).toMatchSnapshot();
  });
});
