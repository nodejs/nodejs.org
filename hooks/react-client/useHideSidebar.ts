'use client';

import { useContext, useEffect } from 'react';

import { ShowSidebarDispatch } from '@/providers/showSidebarProvider';

const useHideSidebar = () => {
  const setShowSidebar = useContext(ShowSidebarDispatch);

  useEffect(() => {
    setShowSidebar(false);

    return () => {
      setShowSidebar(true);
    };
  }, [setShowSidebar]);
};

export default useHideSidebar;
