import Notification from '@node-core/ui-components/Common/Notification';
import * as Toast from '@radix-ui/react-toast';
import type {
  Dispatch,
  FC,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from 'react';
import { createContext, useEffect, useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsOpen(true);
      const timeout = setTimeout(() => {
        setIsOpen(false);
      }, notification.duration);
      return () => clearTimeout(timeout);
    }
  }, [notification]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(() => {
        dispatch(null);
      }, 200); // Match your exit animation duration
    }
  };

  return (
    <NotificationContext.Provider value={notification}>
      <NotificationDispatch.Provider value={dispatch}>
        <Toast.Provider swipeDirection="right">
          {children}
          <Toast.Viewport className={viewportClassName} />
          {notification && (
            <Notification
              open={isOpen}
              duration={notification.duration}
              onChange={handleOpenChange}
            >
              {notification.message}
            </Notification>
          )}
        </Toast.Provider>
      </NotificationDispatch.Provider>
    </NotificationContext.Provider>
  );
};
