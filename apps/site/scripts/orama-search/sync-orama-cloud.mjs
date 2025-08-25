import { CloudManager } from '@oramacloud/client';

import { getDocuments } from './get-documents.mjs';
import { ORAMA_SYNC_BATCH_SIZE } from '../../next.constants.mjs';

// The following follows the instructions at https://docs.orama.com/cloud/data-sources/custom-integrations/webhooks

const INDEX_ID = process.env.ORAMA_INDEX_ID;
const API_KEY = process.env.ORAMA_SECRET_KEY;

const oramaCloudManager = new CloudManager({ api_key: API_KEY });
const oramaIndex = oramaCloudManager.index(INDEX_ID);

// Helper to batch documents
const batchDocuments = (documents, batchSize) => {
  const batches = [];
  for (let i = 0; i < documents.length; i += batchSize) {
    batches.push(documents.slice(i, i + batchSize));
  }
  return batches;
};

// Orama allows to send several documents at once, so we batch them in groups of ORAMA_SYNC_BATCH_SIZE.
// This is not strictly necessary, but it makes the process faster.
const runUpdate = async documents => {
  console.log(`Syncing ${documents.length} documents to Orama Cloud index`);

  const batches = batchDocuments(documents, ORAMA_SYNC_BATCH_SIZE);
  console.log(
    `Sending ${batches.length} batches of up to ${ORAMA_SYNC_BATCH_SIZE} documents`
  );

  for (const [i, batch] of batches.entries()) {
    // In Orama, "update" is an upsert operation.
    console.log(`Updating batch ${i + 1} of ${batches.length}`);
    await oramaIndex.update(batch);
  }
};

// Proceed to call the APIs in order:
// 1. Empty the index
// 2. Insert the documents
// 3. Trigger a deployment
// Once all these steps are done, the new documents will be available in the live index.
// Allow Orama up to 1 minute to distribute the documents to all the 300+ nodes worldwide.
console.log('Emptying the Orama Cloud index...');
await oramaIndex.empty();

await runUpdate(await getDocuments());

console.log('Triggering Orama Cloud deployment...');
await oramaIndex.deploy();

console.log('Orama Cloud sync completed successfully!');
