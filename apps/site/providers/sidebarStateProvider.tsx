'use client';

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { FC, PropsWithChildren } from 'react';

type SidebarState = {
  isLeftSidebarCollapsed: boolean;
  isRightSidebarCollapsed: boolean;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
};

const SIDEBAR_STATE_KEY = 'nodejs-website-sidebar-state';

const SidebarStateContext = createContext<SidebarState | undefined>(undefined);

export const useSidebarState = () => {
  const context = useContext(SidebarStateContext);
  if (!context) {
    throw new Error(
      'useSidebarState must be used within a SidebarStateProvider'
    );
  }
  return context;
};

export const SidebarStateProvider: FC<PropsWithChildren> = ({ children }) => {
  // Always start with identical state for server and client
  const [sidebarState, setSidebarState] = useState({
    left: false,
    right: false,
  });

  // Track if we've loaded from localStorage to avoid overwriting
  const hasLoadedFromStorage = useRef(false);

  // Load state from localStorage after hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SIDEBAR_STATE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate the parsed data
        if (
          typeof parsed.left === 'boolean' &&
          typeof parsed.right === 'boolean'
        ) {
          setSidebarState(parsed);
        }
      }
    } catch (error) {
      console.warn('Failed to load sidebar state from localStorage:', error);
    }
    hasLoadedFromStorage.current = true;
  }, []);

  // Save state to localStorage when it changes (but only after initial load)
  useEffect(() => {
    if (!hasLoadedFromStorage.current) {
      return;
    }

    try {
      localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(sidebarState));
    } catch {
      // localStorage might be unavailable in private mode
      // Silently fail - state will still work for current session
    }
  }, [sidebarState]);

  const toggleLeftSidebar = useCallback(() => {
    setSidebarState(prev => ({ ...prev, left: !prev.left }));
  }, []);

  const toggleRightSidebar = useCallback(() => {
    setSidebarState(prev => ({ ...prev, right: !prev.right }));
  }, []);

  return (
    <SidebarStateContext.Provider
      value={{
        isLeftSidebarCollapsed: sidebarState.left,
        isRightSidebarCollapsed: sidebarState.right,
        toggleLeftSidebar,
        toggleRightSidebar,
      }}
    >
      {children}
    </SidebarStateContext.Provider>
  );
};
