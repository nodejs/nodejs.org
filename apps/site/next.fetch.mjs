/**
 * @typedef { RequestInit & { maxRetry?: number; delay?: number; }} RetryOptions
 */

const isTimeoutError = e =>
  e instanceof Error &&
  typeof e.cause === 'object' &&
  e.cause !== null &&
  'code' in e.cause &&
  e.cause.code === 'ETIMEDOUT';

const sleep = ms => new Promise(r => setTimeout(r, ms));

/**
 * Does a fetch with retry logic for network errors and timeouts.
 *
 * @param {string} url
 * @param {RetryOptions} [options]
 * @returns {Promise<Response>}
 */
export const fetchWithRetry = async (
  url,
  { maxRetry = 3, delay = 100, ...options } = {}
) => {
  const retries = Math.max(1, Number(maxRetry) || 1);
  const backoff = Math.max(0, Number(delay) || 0);

  const attemptFetch = attempt =>
    fetch(url, options).catch(e => {
      if (attempt === retries || !isTimeoutError(e)) {
        throw e;
      }

      return sleep(backoff * attempt).then(() => attemptFetch(attempt + 1));
    });

  return attemptFetch(1);
};
