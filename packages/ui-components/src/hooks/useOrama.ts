import { create, search, load, type RawData } from '@orama/orama';
import { useMemo, useRef } from 'react';

import type { OramaCloud } from '@orama/core';

/**
 * Hook for initializing and managing an Orama search database.
 * Search data is loaded lazily on the first search call and reused thereafter.
 *
 * @param loadData Function returning the serialized Orama database payload.
 */
export default function useOrama(loadData: () => Promise<RawData>): OramaCloud {
  const loadPromiseRef = useRef<Promise<void> | null>(null);

  const client = useMemo(() => {
    loadPromiseRef.current = null;

    const db = create({
      schema: {
        title: 'string',
        description: 'string',
        href: 'string',
        siteSection: 'string',
      },
    });

    const ensureLoaded = (): Promise<void> => {
      if (!loadPromiseRef.current) {
        loadPromiseRef.current = loadData().then(data => {
          load(db, data);
        });
      }

      return loadPromiseRef.current;
    };

    // TODO(@avivkeller): Orama might need to be replaced
    // @ts-expect-error - We are overriding the search method
    db.search = async options => {
      await ensureLoaded();
      return search(db, options);
    };

    return db;
  }, [loadData]);

  return client as unknown as OramaCloud;
}
