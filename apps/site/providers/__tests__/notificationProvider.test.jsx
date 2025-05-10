import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  NotificationProvider,
  NotificationDispatch,
} from '#site/providers/notificationProvider';

describe('NotificationProvider', () => {
  it('renders children and shows notification with the provided message', async t => {
    t.mock.timers.enable();
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
      t.mock.timers.tick(3000);
    });

    t.mock.timers.reset();

    await waitFor(() => assert.ok(getByText(testMessage).ownerDocument));
  });
});
