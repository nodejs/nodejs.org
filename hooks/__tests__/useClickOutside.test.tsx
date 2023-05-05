import { render, fireEvent } from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';

describe('useClickOutside', () => {
  const handler = jest.fn();
  const Component = () => {
    const ref = useClickOutside<HTMLDivElement>(handler);
    return <div ref={ref}>Hello</div>;
  };
  it('should call the handler function when clicking outside of the element', () => {
    render(<Component />);
    fireEvent.click(document.body);
    expect(handler).toHaveBeenCalled();
  });
});
