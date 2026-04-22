import { writeFile } from 'node:fs/promises';

import { create, load, insertMultiple, save } from '@orama/orama';

import { BETA_DOCS_ORAMA_DB_URL, LEARN_ORAMA_DB_URL } from './constants.mjs';

const prefixDocs = (db, prefix) => ({
  ...db,
  docs: {
    ...db.docs,
    docs: Object.fromEntries(
      Object.entries(db.docs.docs).map(([k, v]) => [
        k,
        { ...v, href: `${prefix}${v.href}` },
      ])
    ),
  },
});

// Load both URLs and sort by size, larger first
const loaded = await Promise.all([
  await fetch(LEARN_ORAMA_DB_URL).then(res => res.json()),
  await fetch(BETA_DOCS_ORAMA_DB_URL).then(res => res.json()),
]).then(([a, b]) =>
  [prefixDocs(a, '/learn'), prefixDocs(b, '/api')].sort(
    (a, b) => b.docs.length - a.docs.length
  )
);

const orama = create({ schema: {} });
load(orama, loaded.shift());
insertMultiple(orama, Object.values(loaded.shift().docs.docs));

const saved = save(orama);

writeFile(
  new URL('../../public/orama-db.json', import.meta.url),
  JSON.stringify(saved, null, 2)
);
