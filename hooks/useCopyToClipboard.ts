import { useEffect, useState } from 'react';

const copyToClipboard = (value: string | undefined) => {
  if (!value || typeof navigator === 'undefined') {
    return Promise.resolve(false);
  }

  return navigator.clipboard
    .writeText(value)
    .then(() => true)
    .catch(() => false);
};

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyText = (text: string | undefined) =>
    copyToClipboard(text).then(setCopied);

  useEffect(() => {
    if (copied) {
      const timerId = setTimeout(() => setCopied(false), 3000);

      return () => clearTimeout(timerId);
    }

    return undefined;
  }, [copied]);

  return [copied, copyText] as const;
};
