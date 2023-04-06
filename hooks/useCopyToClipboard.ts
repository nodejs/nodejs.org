import { useEffect, useState } from 'react';

const copyToClipboard = (value: string) => {
  if (typeof navigator === 'undefined') {
    return Promise.resolve(false);
  }

  return navigator.clipboard
    .writeText(value)
    .then(() => true)
    .catch(() => false);
};

// eslint-disable-next-line no-unused-vars
export const useCopyToClipboard = (): [boolean, (text: string) => void] => {
  const [copied, setCopied] = useState(false);

  const copyText = (text: string) => copyToClipboard(text).then(setCopied);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timerId = setTimeout(() => setCopied(false), 3000);

    return () => clearTimeout(timerId);
  }, [copied]);

  return [copied, copyText];
};
