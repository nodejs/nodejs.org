import { useContext } from 'react';

import { NotificationDispatch } from '@/providers/notificationProvider';

export const useNotification = () => useContext(NotificationDispatch);
