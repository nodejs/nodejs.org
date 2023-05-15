import { render, fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';
import { useClickOutside } from '../useClickOutside';

describe('useClickOutside', () => {
  const Component = () => {
    const [state, setState] = useState(false);
    const ref = useClickOutside<HTMLDivElement>(() => setState(false));

    return (
      <div>
        <h1>Page</h1>
        <div>
          <button onClick={() => setState(!state)}>Open</button>
          {state && (
            <div ref={ref}>
              <h2>Modal</h2>
            </div>
          )}
        </div>
      </div>
    );
  };

  it('should call handler when click outside', () => {
    render(<Component />);
    fireEvent.click(screen.getByText('Open'));
    fireEvent.click(screen.getByText('Page'));
    expect(screen.queryByText('Modal')).not.toBeInTheDocument();
  });

  it('should not call handler when click inside', () => {
    render(<Component />);
    fireEvent.click(screen.getByText('Open'));
    fireEvent.click(screen.getByText('Modal'));
    expect(screen.getByText('Modal')).toBeInTheDocument();
  });
});
