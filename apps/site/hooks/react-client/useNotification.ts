'use client';

import { useContext } from 'react';

import { NotificationDispatch } from '@/providers/notificationProvider';

const useNotification = () => useContext(NotificationDispatch);

export default useNotification;
