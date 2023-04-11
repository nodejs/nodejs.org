import { render } from '@testing-library/react';
import AnimatedPlaceholder from './../index';

describe('AnimatedPlaceholder component', () => {
  it('should render correctly with default skeleton', () => {
    const { container } = render(<AnimatedPlaceholder />);

    expect(container).toMatchSnapshot();
  });

  it('should support passing loader skeleton from outside', () => {
    const { container } = render(
      <AnimatedPlaceholder>
        <div className="animated-placeholder__image" />
      </AnimatedPlaceholder>
    );

    expect(container).toMatchSnapshot();
  });
});
