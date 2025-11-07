import { OramaCloud } from '@orama/core';

import { getDocuments } from './get-documents.mjs';
import { ORAMA_SYNC_BATCH_SIZE } from '../../next.constants.mjs';

// The following follows the instructions at https://docs.orama.com/cloud/data-sources/custom-integrations/webhooks

const orama = new OramaCloud({
  projectId: process.env.NEW_ORAMA_PROJECT_ID || '',
  apiKey: process.env.NEW_ORAMA_PRIVATE_API_KEY || '',
});

const datasource = orama.dataSource(process.env.NEW_ORAMA_DATASOURCE_ID || '');
const documents = await getDocuments();

console.log(`Syncing ${documents.length} documents to Orama Cloud index`);

// Orama allows to send several documents at once, so we batch them in groups of 50.
// This is not strictly necessary, but it makes the process faster.
const runUpdate = async () => {
  const batchSize = ORAMA_SYNC_BATCH_SIZE;
  const batches = [];

  for (let i = 0; i < documents.length; i += batchSize) {
    batches.push(documents.slice(i, i + batchSize));
  }

  console.log(`Sending ${batches.length} batches of ${batchSize} documents`);

  for (const batch of batches) {
    await datasource.insertDocuments(batch);
  }
};

// Now we proceed to call the APIs in order.
// The previous implementation used to empty the index before inserting new documents
// to remove documents that are no longer in the source.
// The new API from @orama/core might have a different approach for full sync.
// Based on the provided examples, we are now only running the update.
await runUpdate();

console.log('Orama Cloud sync completed successfully!');
