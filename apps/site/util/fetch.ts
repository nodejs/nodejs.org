type RetryOptions = RequestInit & {
  maxRetry?: number;
  delay?: number;
};

const isTimeoutError = (e: unknown): boolean =>
  e instanceof Error &&
  typeof e.cause === 'object' &&
  e.cause !== null &&
  'code' in e.cause &&
  e.cause.code === 'ETIMEDOUT';

export const fetchWithRetry = async (
  url: string,
  { maxRetry = 3, delay = 100, ...options }: RetryOptions = {}
) => {
  for (let i = 1; i <= maxRetry; i++) {
    try {
      return await fetch(url, options);
    } catch (e) {
      console.debug(
        `fetch of ${url} failed at ${Date.now()}, attempt ${i}/${maxRetry}`,
        e
      );

      if (i === maxRetry || !isTimeoutError(e)) {
        throw e;
      }

      await new Promise(resolve => setTimeout(resolve, delay * i));
    }
  }
};
