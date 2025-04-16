import { render } from '@testing-library/react';

import useNotification from '@/hooks/react-client/useNotification';
import { NotificationProvider } from '@/providers/notificationProvider';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

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
    assert.ok(result.ownerDocument);
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

    assert.equal(result, null);
  });
});
