import { CollectionManager } from '@orama/core';

import { siteContent } from './get-documents.mjs';
import { ORAMA_SYNC_BATCH_SIZE } from '../../next.constants.mjs';

// The following follows the instructions at https://docs.orama.com/cloud/data-sources/custom-integrations/webhooks

const collectionManager = new CollectionManager({
  authJwtURL: 'https://staging.app.orama.com/api/user/jwt',
  collectionID: '85f541b3-b691-4d3e-9874-e7b3b4630adb',
  apiKey: 'p_JMpbuY216Pv0WCQFGijQLXwVIJzrf1dy55i3eCbNJDP',
});

const index = collectionManager.setIndex(
  '55cdf5e4-63e3-4498-926a-ee6152a510cd'
);

console.log(`Syncing ${siteContent.length} documents to Orama Cloud index`);

// Orama allows to send several documents at once, so we batch them in groups of 50.
// This is not strictly necessary, but it makes the process faster.
const runUpdate = async () => {
  const batchSize = ORAMA_SYNC_BATCH_SIZE;
  const batches = [];

  for (let i = 0; i < siteContent.length; i += batchSize) {
    batches.push(siteContent.slice(i, i + batchSize));
  }

  console.log(`Sending ${batches.length} batches of ${batchSize} documents`);

  for (const batch of batches) {
    await index.upsertDocuments(batch);
  }
};

// Now we proceed to call the APIs in order.
// The previous implementation used to empty the index before inserting new documents
// to remove documents that are no longer in the source.
// The new API from @orama/core might have a different approach for full sync.
// Based on the provided examples, we are now only running the update.
await runUpdate();

console.log('Orama Cloud sync completed successfully!');
