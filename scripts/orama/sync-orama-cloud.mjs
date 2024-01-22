import { siteContent } from './get-documents.mjs';

const INDEX_ID = process.env.ORAMA_INDEX_ID;
const API_KEY = process.env.ORAMA_SECRET_KEY;
const ORAMA_API_BASE_URL = `https://api.oramasearch.com/api/v1/webhooks/${INDEX_ID}`;

const oramaHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`,
};

const runUpdate = async () => {
  const batchSize = 50;
  const batches = [];

  for (let i = 0; i < siteContent.length; i += batchSize) {
    batches.push(siteContent.slice(i, i + batchSize));
  }

  console.log(
    `Inserting ${batches.length} batches of ${batchSize} documents each.`
  );
  await Promise.all(batches.map(insertBatch));
  console.log(`Done inserting batches. ${siteContent.length} documents total.`);
};

const insertBatch = async batch => {
  await fetch(`${ORAMA_API_BASE_URL}/notify`, {
    method: 'POST',
    headers: oramaHeaders,
    body: JSON.stringify({
      upsert: batch,
    }),
  });
};

const triggerDeployment = async () => {
  console.log('Triggering deployment');
  await fetch(`${ORAMA_API_BASE_URL}/deploy`, {
    method: 'POST',
    headers: oramaHeaders,
  });
  console.log('Done triggering deployment');
};

const emptyOramaIndex = async () => {
  console.log('Emptying index');
  await fetch(`${ORAMA_API_BASE_URL}/snapshot`, {
    method: 'POST',
    headers: oramaHeaders,
    body: JSON.stringify([]),
  });
  console.log('Done emptying index');
};

await emptyOramaIndex();
await runUpdate();
await triggerDeployment();
