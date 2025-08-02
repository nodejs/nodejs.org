import * as Toast from '@radix-ui/react-toast';
import { createContext, useContext, useEffect, useState } from 'react';
import type {
  Dispatch,
  FC,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from 'react';

import Notification from '#ui/Common/Notification';

import styles from './index.module.css';

type NotificationContextType = {
  message: string | ReactNode;
  duration: number;
} | null;

const NotificationContext = createContext<NotificationContextType>(null);

export const NotificationDispatch = createContext<
  Dispatch<SetStateAction<NotificationContextType>>
>(() => {});

export const useNotification = () => useContext(NotificationDispatch);

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
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
          {notification && (
            <Notification duration={notification.duration}>
              {notification.message}
            </Notification>
          )}

          <Toast.Viewport className={styles.viewport} />
        </Toast.Provider>
      </NotificationDispatch.Provider>
    </NotificationContext.Provider>
  );
};
