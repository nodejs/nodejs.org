import { setTimeout } from 'node:timers/promises';

type RetryOptions = RequestInit & {
  maxRetry?: number;
  delay?: number;
};

type FetchError = {
  cause: {
    code: string;
  };
};

export const fetchWithRetry = async (
  url: string,
  { maxRetry = 3, delay = 100, ...options }: RetryOptions = {}
) => {
  for (let i = 1; i <= maxRetry; i++) {
    try {
      return fetch(url, options);
    } catch (e) {
      console.debug(
        `fetch of ${url} failed at ${Date.now()}, attempt ${i}/${maxRetry}`,
        e
      );

      if (i === maxRetry || (e as FetchError).cause.code !== 'ETIMEDOUT') {
        throw e;
      }

      await setTimeout(delay * i);
    }
  }
};
