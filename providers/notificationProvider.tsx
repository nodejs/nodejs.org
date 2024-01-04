import * as Toast from '@radix-ui/react-toast';
import type {
  Dispatch,
  FC,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from 'react';
import { createContext, useEffect, useState } from 'react';

import Notification from '@/components/Common/Notification';

type NotificationContextType = {
  message: string | ReactNode;
  duration: number;
} | null;

type NotificationProps = { viewportClassName?: string };

const NotificationContext = createContext<NotificationContextType>(null);

export const NotificationDispatch = createContext<
  Dispatch<SetStateAction<NotificationContextType>>
>(() => {});

export const NotificationProvider: FC<PropsWithChildren<NotificationProps>> = ({
  viewportClassName,
  children,
}) => {
  const [notification, dispatch] = useState<NotificationContextType>(null);

  useEffect(() => {
    const timeout = setTimeout(() => dispatch(null), notification?.duration);

    return () => clearTimeout(timeout);
  }, [notification]);

  return (
    <NotificationContext.Provider value={notification}>
      <NotificationDispatch.Provider value={dispatch}>
        <Toast.Provider>
          {children}

          <Toast.Viewport className={viewportClassName} />

          {notification && (
            <Notification duration={notification.duration}>
              {notification.message}
            </Notification>
          )}
        </Toast.Provider>
      </NotificationDispatch.Provider>
    </NotificationContext.Provider>
  );
};
