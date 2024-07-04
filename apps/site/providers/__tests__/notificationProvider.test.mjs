import { render, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  NotificationProvider,
  NotificationDispatch,
} from '@/providers/notificationProvider';

jest.useFakeTimers();

describe('NotificationProvider', () => {
  it('renders children and shows notification with the provided message', async () => {
    const testMessage = 'Test Notification';
    const testDuration = 3000;

    const { getByText } = render(
      <NotificationProvider>
        <NotificationDispatch.Consumer>
          {dispatch => (
            <button
              onClick={() =>
                dispatch({ message: testMessage, duration: testDuration })
              }
            >
              Show Notification
            </button>
          )}
        </NotificationDispatch.Consumer>
      </NotificationProvider>
    );

    act(() => {
      userEvent.click(getByText('Show Notification'));
      jest.advanceTimersByTime(testDuration);
    });

    await waitFor(() => expect(getByText(testMessage)).toBeInTheDocument());
  });
});
