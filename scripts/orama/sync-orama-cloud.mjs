import { siteContent } from './get-documents.mjs';

const INDEX_ID = process.env.ORAMA_INDEX_ID;
const API_KEY = process.env.ORAMA_SECRET_KEY;

async function runUpdate() {
  const batchSize = 50;
  const batches = [];

  for (let i = 0; i < siteContent.length; i += batchSize) {
    batches.push(siteContent.slice(i, i + batchSize));
  }

  console.log(
    `Inserting ${batches.length} batches of ${batchSize} documents each.`
  );
  await Promise.all(batches.map(insertBatch));
  console.log('Done inserting batches.');
}

async function insertBatch(batch) {
  await fetch(
    `https://api.oramasearch.com/api/v1/webhooks/${INDEX_ID}/notify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        upsert: batch,
      }),
    }
  );
}

async function triggerDeployment() {
  console.log('Triggering deployment');
  await fetch(
    `https://api.oramasearch.com/api/v1/webhooks/${INDEX_ID}/deploy`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  console.log('Done triggering deployment');
}

async function emptyOramaIndex() {
  console.log('Emptying index');
  await fetch(
    `https://api.oramasearch.com/api/v1/webhooks/${INDEX_ID}/snapshot`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([]),
    }
  );
  console.log('Done emptying index');
}

await emptyOramaIndex();
await runUpdate();
await triggerDeployment();
