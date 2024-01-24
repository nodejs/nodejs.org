import { siteContent } from './get-documents.mjs';
import { ORAMA_SYNC_BATCH_SIZE } from '../../next.constants.mjs';

// The following follows the instructions at https://docs.oramasearch.com/cloud/data-sources/custom-integrations/webhooks

const INDEX_ID = process.env.ORAMA_INDEX_ID;
const API_KEY = process.env.ORAMA_SECRET_KEY;
const ORAMA_API_BASE_URL = `https://api.oramasearch.com/api/v1/webhooks/${INDEX_ID}`;

const oramaHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`,
};

// Orama allows to send several documents at once, so we batch them in groups of 50.
// This is not strictly necessary, but it makes the process faster.
const runUpdate = async () => {
  const batchSize = ORAMA_SYNC_BATCH_SIZE;
  const batches = [];

  for (let i = 0; i < siteContent.length; i += batchSize) {
    batches.push(siteContent.slice(i, i + batchSize));
  }

  await Promise.all(batches.map(insertBatch));
};

// We call the "notify" API to upsert the documents in the index.
// Orama will keep a queue of all the documents we send, and will process them once we call the "deploy" API.
// Full docs on the "notify" API: https://docs.oramasearch.com/cloud/data-sources/custom-integrations/webhooks#updating-removing-inserting-elements-in-a-live-index
const insertBatch = async batch =>
  await fetch(`${ORAMA_API_BASE_URL}/notify`, {
    method: 'POST',
    headers: oramaHeaders,
    body: JSON.stringify({ upsert: batch }),
  });

// We call the "deploy" API to trigger a deployment of the index, which will process all the documents in the queue.
// Full docs on the "deploy" API: https://docs.oramasearch.com/cloud/data-sources/custom-integrations/webhooks#deploying-the-index
const triggerDeployment = async () =>
  await fetch(`${ORAMA_API_BASE_URL}/deploy`, {
    method: 'POST',
    headers: oramaHeaders,
  });

// We call the "snapshot" API to empty the index before inserting the new documents.
// The "snapshot" API is typically used to replace the entire index with a fresh set of documents, but we use it here to empty the index.
// This operation gets queued, so the live index will still be available until we call the "deploy" API and redeploy the index.
// Full docs on the "snapshot" API: https://docs.oramasearch.com/cloud/data-sources/custom-integrations/webhooks#inserting-a-snapshot
const emptyOramaIndex = async () =>
  await fetch(`${ORAMA_API_BASE_URL}/snapshot`, {
    method: 'POST',
    headers: oramaHeaders,
    body: JSON.stringify([]),
  });

// Now we proceed to call the APIs in order:
// 1. Empty the index
// 2. Insert the documents
// 3. Trigger a deployment
// Once all these steps are done, the new documents will be available in the live index.
// Allow Orama up to 1 minute to distribute the documents to all the 300+ nodes worldwide.
await emptyOramaIndex();
await runUpdate();
await triggerDeployment();
