import { useRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';

describe('useClickOutside', () => {
  it('should call the handler function when clicking outside of the element', () => {
    const handler = jest.fn();
    const Component = () => {
      const ref = useRef(null);
      useClickOutside({ ref, handler });
      return (
        <>
          <div ref={ref}>inside</div>
          <div>outside</div>
        </>
      );
    };
    render(<Component />);

    fireEvent.click(screen.getByText('outside'));

    expect(handler).toHaveBeenCalled();
  });

  it('should not call the handler function when clicking inside of the element', () => {
    const handler = jest.fn();
    const Component = () => {
      const ref = useRef(null);
      useClickOutside({ ref, handler });
      return <div ref={ref}>inside</div>;
    };
    render(<Component />);

    fireEvent.click(screen.getByText('inside'));

    expect(handler).not.toHaveBeenCalled();
  });
});
