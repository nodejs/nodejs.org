'use client';

import SearchBox from '@node-core/ui-components/Common/Search';
import useOrama from '@node-core/ui-components/hooks/useOrama';
import { create, insertMultiple, save } from '@orama/orama';
import { useTranslations } from 'next-intl';

import { ORAMA_DB_URLS } from '#site/next.constants.mjs';

import type { FC } from 'react';

/**
 * Shape of a single Orama document entry.
 * `href` is required (we prefix it); other fields are passthrough.
 */
type OramaDoc = { href: string } & Record<string, unknown>;

/**
 * Shape of a serialized Orama database snapshot (from `save()` on the server
 * side, fetched as JSON on the client). We only type the parts we touch.
 */
type SerializedOramaDb = {
  docs: {
    docs: Record<string, OramaDoc>;
  };
};

/**
 * Each locale/section of the site ships its own prebuilt Orama index, but the
 * hrefs inside those indexes are relative to that section's root. When we
 * merge multiple indexes into a single client-side DB, we need to re-scope
 * those hrefs so clicks route to the correct top-level path.
 */
export const addPrefixToDocs = <T extends SerializedOramaDb>(
  db: T,
  prefix: string
): T => {
  const prefixedDocs: Record<string, OramaDoc> = {};

  // Object.entries + Object.fromEntries would also work, but a single pass
  // with a plain loop avoids the intermediate array allocations
  for (const [id, doc] of Object.entries(db.docs.docs)) {
    prefixedDocs[id] = { ...doc, href: `${prefix}${doc.href}` };
  }

  return {
    ...db,
    docs: { ...db.docs, docs: prefixedDocs },
  };
};

const WithSearch: FC = () => {
  const t = useTranslations();

  // `useOrama` expects an initializer that returns serialized RawData.
  // We build a temporary DB, populate it from every configured index, then
  // serialize it so the hook can `load()` it into its own client instance.
  const client = useOrama(async () => {
    const db = create({
      schema: {
        title: 'string',
        description: 'string',
        href: 'string',
        siteSection: 'string',
      },
    });

    // Kick off every fetch concurrently — network latency, not CPU, is the
    // bottleneck here, so serializing these would waste ~N× round-trip time.
    const indexes = await Promise.all(
      Object.entries(ORAMA_DB_URLS).map(async ([key, url]) => {
        const fetchedDb = (await fetch(url).then(res =>
          res.json()
        )) as SerializedOramaDb;
        return addPrefixToDocs(fetchedDb, `/${key}`);
      })
    );

    for (const index of indexes) {
      await insertMultiple(db, Object.values(index.docs.docs) as Array<never>);
    }

    return save(db);
  });

  return (
    <SearchBox
      client={client}
      closeShortcutLabel={t('components.search.keyboardShortcuts.close')}
      navigateShortcutLabel={t('components.search.keyboardShortcuts.navigate')}
      noResultsTitle={t('components.search.noResultsFoundFor')}
      placeholder={t('components.search.searchPlaceholder')}
      selectShortcutLabel={t('components.search.keyboardShortcuts.select')}
    />
  );
};

export default WithSearch;
