'use client';

import { useContext } from 'react';

import { NotificationDispatch } from '#site/providers/notificationProvider';

const useNotification = () => useContext(NotificationDispatch);

export default useNotification;
