import { create, search, load } from '@orama/orama';
import { useState, useEffect, useRef } from 'react';

import type { OramaCloud } from '@orama/core';

type SearchOptions = Record<string, unknown>;
type SearchClient = Awaited<ReturnType<typeof create>> & {
  search: (options: SearchOptions) => Promise<unknown>;
};

/**
 * Hook for initializing and managing Orama search database.
 * The search data is lazily fetched on the first search call.
 *
 * @param pathname - Path to orama database
 */
export default function useOrama(path: string): OramaCloud | null {
  const [client, setClient] = useState<SearchClient | null>(null);
  const ref = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const db = create({
      schema: {
        title: 'string',
        description: 'string',
        href: 'string',
        siteSection: 'string',
      },
    }) as unknown as SearchClient;

    /**
     * Ensures the search data is loaded.
     */
    const ensureLoaded = (): Promise<void> => {
      if (!ref.current) {
        ref.current = fetch(path)
          .then(response => (response.ok ? response.json() : undefined))
          .then(data => {
            if (data) {
              return load(db, data);
            }
          })
          .then(() => undefined)
          .catch(() => {
            ref.current = null;
          });
      }

      return ref.current;
    };

    // TODO(@avivkeller): Orama might need to be replaced
    db.search = async (options: SearchOptions): Promise<unknown> => {
      try {
        search(db, options);
      } catch (e) {
        console.error(e);
      }
      await ensureLoaded();
      return search(db, options);
    };

    setClient(db);
  }, [path]);

  return client as unknown as OramaCloud;
}
