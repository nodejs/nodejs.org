import { CloudManager } from '@oramacloud/client';

import { siteContent } from './get-documents.mjs';
import { ORAMA_SYNC_BATCH_SIZE } from '../../next.constants.mjs';

// The following follows the instructions at https://docs.orama.com/cloud/data-sources/custom-integrations/webhooks

const INDEX_ID = process.env.ORAMA_INDEX_ID;
const API_KEY = process.env.ORAMA_SECRET_KEY;

const oramaCloudManager = new CloudManager({
  api_key: API_KEY,
});

const oramaIndex = oramaCloudManager.index(INDEX_ID);

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
    // In Orama, "update" is an upsert operation.
    await oramaIndex.update(batch);
  }
};

// Now we proceed to call the APIs in order:
// 1. Empty the index
// 2. Insert the documents
// 3. Trigger a deployment
// Once all these steps are done, the new documents will be available in the live index.
// Allow Orama up to 1 minute to distribute the documents to all the 300+ nodes worldwide.
await oramaIndex.empty();
await runUpdate();
await oramaIndex.deploy();

console.log('Orama Cloud sync completed successfully!');
