import { render, fireEvent, screen } from '@testing-library/react';
import { useRef } from 'react';
import { useClickOutside } from '../useClickOutside';

describe('test hook useClickOutside', () => {
  const handler = jest.fn();
  const Component = ({ handler }: { handler: () => void }) => {
    const ref = useRef(null);
    useClickOutside(ref, handler);

    return (
      <>
        <div data-testid="outside" />
        <div ref={ref} data-testid="inside" />
      </>
    );
  };

  it('calls handler when clicking outside ref', () => {
    render(<Component handler={handler} />);
    fireEvent.click(screen.getByTestId('outside'));
    expect(handler).toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('inside'));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
