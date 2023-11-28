import { render } from '@testing-library/react';

import { NotificationProvider } from '@/providers/notificationProvider';

import useNotification from '../useNotification';

describe('useNotification', () => {
  it('should return the notification dispatch function', () => {
    // Arrange
    const TestComponent = () => {
      const notificationDispatch = useNotification();
      return (
        <div>
          {notificationDispatch ? 'Dispatch available' : 'Dispatch unavailable'}
        </div>
      );
    };

    // Act
    const { getByText } = render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Assert
    const result = getByText('Dispatch available');
    expect(result).toBeInTheDocument();
  });

  it('should return null outside NotificationProvider', () => {
    // Arrange
    const TestComponent = () => {
      const notificationDispatch = useNotification();
      return (
        <div>
          {notificationDispatch ? 'Dispatch available' : 'Dispatch unavailable'}
        </div>
      );
    };

    // Act
    const { queryByText } = render(<TestComponent />);

    // Assert
    const result = queryByText((content, element) => {
      return element.textContent === 'Dispatch unavailable';
    });

    expect(result).toBeNull();
  });
});
