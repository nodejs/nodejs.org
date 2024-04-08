'use client';

import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export const ShowSidebarDispatch = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => {});

export const ShowSidebarProvider = ShowSidebarDispatch.Provider;
