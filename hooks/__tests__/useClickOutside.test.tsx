import { useRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';

describe('useClickOutside', () => {
  const mockFn = jest.fn(() => console.log('click outside'));
  const SubComponent = ({ onClickOutside }: { onClickOutside: () => void }) => {
    const ref = useRef(null);
    useClickOutside(ref, onClickOutside);
    return <div ref={ref}>inside</div>;
  };
  const Component = () => (
    <div>
      outside
      <SubComponent onClickOutside={mockFn} />
    </div>
  );

  it('should call onClickOutside when click outside', () => {
    render(<Component />);
    fireEvent.click(screen.getByText('outside'));
    expect(mockFn).toHaveBeenCalled();
  });

  it('should not call onClickOutside when click inside', () => {
    render(<Component />);
    fireEvent.click(screen.getByText('inside'));
    expect(mockFn).not.toHaveBeenCalled();
  });
});
