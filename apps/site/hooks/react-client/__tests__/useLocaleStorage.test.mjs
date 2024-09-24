import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { useLocalStorage } from '@/hooks/react-client/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  it('should initialize with the provided initial value', () => {
    render(() => {
      const [value] = useLocalStorage('testKey', 'initialValue');
      expect(value).toBe('initialValue');
    });
  });

  it('should update localStorage when value changes', () => {
    render(() => {
      const TestComponent = () => {
        const [value, setValue] = useLocalStorage('testKey', 'initialValue');

        act(() => {
          setValue('newValue');
        });

        return <div>{value}</div>;
      };

      const { container } = render(<TestComponent />);

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'testKey',
        JSON.stringify('newValue')
      );
      expect(container.textContent).toBe('newValue');
    });
  });
});
