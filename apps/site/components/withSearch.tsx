'use client';

import SearchBox from '@node-core/ui-components/Common/Search';
import { create, insertMultiple, search } from '@orama/orama';
import { useTranslations } from 'next-intl';
import { useMemo, useRef } from 'react';

import { ORAMA_DB_URLS } from '#site/next.constants.mjs';

import type { OramaCloud } from '@orama/core';
import type { AnyOrama } from '@orama/orama';
import type { FC } from 'react';

type OramaDoc = { href: string } & Record<string, unknown>;

type SerializedOramaDb = {
  docs: {
    docs: Record<string, OramaDoc>;
  };
};

export const addPrefixToDocs = <T extends SerializedOramaDb>(
  db: T,
  prefix: string
): T => {
  const prefixedDocs: Record<string, OramaDoc> = {};

  for (const [id, doc] of Object.entries(db.docs.docs)) {
    prefixedDocs[id] = { ...doc, href: `${prefix}${doc.href}` };
  }

  return {
    ...db,
    docs: { ...db.docs, docs: prefixedDocs },
  };
};

const loadOrama = async (db: AnyOrama): Promise<void> => {
  const indexes = await Promise.all(
    Object.entries(ORAMA_DB_URLS).map(async ([key, url]) => {
      const response = await fetch(url);
      const fetchedDb = (await response.json()) as SerializedOramaDb;

      return addPrefixToDocs(fetchedDb, key);
    })
  );

  for (const index of indexes) {
    await insertMultiple(db, Object.values(index.docs.docs) as Array<never>);
  }
};

export const useOrama = () => {
  const loadPromiseRef = useRef<Promise<void> | null>(null);

  return useMemo(() => {
    const db = create({
      schema: {
        title: 'string',
        description: 'string',
        href: 'string',
        siteSection: 'string',
      },
    });

    // @ts-expect-error We are overriding a method, an error is expected.
    db.search = async options => {
      await (loadPromiseRef.current ??= loadOrama(db));
      return search(db, options);
    };

    return db;
  }, []) as unknown as OramaCloud;
};

const WithSearch: FC = () => {
  const t = useTranslations();
  const client = useOrama();

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
