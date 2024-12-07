'use strict';

const latestKnownVersion = 'v0.40.1';

/**
 * Fetches the latest NVM version
 * @returns {Promise<`v${string}`>} Latest NVM version
 */
export default async function generateNvmData() {
  return fetch('https://latest.nvm.sh', { redirect: 'manual' })
    .then(({ headers }) => {
      const url = headers.get('location');
      if (!url) {
        throw new Error('No redirect location found');
      }
      return fetch(url, { redirect: 'manual' });
    })
    .then(x => {
      const url = x.headers.get('location');
      const version = url?.slice(url.lastIndexOf('/') + 1);
      return version || latestKnownVersion;
    })
    .catch(() => latestKnownVersion);
}
