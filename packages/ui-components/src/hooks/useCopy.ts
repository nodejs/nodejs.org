import { useCallback, useEffect, useState } from 'react';

const copyToClipboard = async (value?: string): Promise<boolean> => {
  if (!value) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
};

export default function useCopy() {
  const [copied, setCopied] = useState(false);

  const copyText = useCallback(async (text?: string) => {
    const success = await copyToClipboard(text);
    setCopied(success);
  }, []);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timerId = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timerId);
  }, [copied]);

  return [copied, copyText] as const;
}
