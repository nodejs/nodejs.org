import { OramaCloud } from '@orama/core';
import { createContext, useContext, useMemo } from 'react';

import {
  ORAMA_CLOUD_PROJECT_ID,
  ORAMA_CLOUD_READ_API_KEY,
} from '#site/next.constants.mjs';

const OramaContext = createContext<OramaCloud | null>(null);

export const OramaProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => {
    if (ORAMA_CLOUD_PROJECT_ID && ORAMA_CLOUD_READ_API_KEY) {
      return new OramaCloud({
        projectId: ORAMA_CLOUD_PROJECT_ID,
        apiKey: ORAMA_CLOUD_READ_API_KEY,
      });
    }
    return null;
  }, []);
  return (
    <OramaContext.Provider value={instance}>{children}</OramaContext.Provider>
  );
};

export const useOrama = () => {
  const context = useContext(OramaContext);
  return context;
};
