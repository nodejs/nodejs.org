import { create, insertMultiple } from '@orama/orama';

import { siteContent } from './get-documents.mjs';

export const orama = await create({
  schema: {
    siteSection: 'enum',
    pageTitle: 'string',
    pageSectionTitle: 'string',
    pageSectionContent: 'string',
  },
});

await insertMultiple(orama, siteContent);
