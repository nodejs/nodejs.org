import { setTimeout } from 'node:timers/promises';

type RetryOptions = RequestInit & {
  maxRetry: number;
  delay: number;
};

export const fetchWithRetry = async (
  url: string,
  { maxRetry = 3, delay = 100, ...options }: RetryOptions
) => {
  for (let i = 1; i <= maxRetry; i++) {
    try {
      return fetch(url, options);
    } catch (e) {
      if (i === maxRetry) {
        throw e;
      }

      await setTimeout(delay);
      continue;
    }
  }
};
