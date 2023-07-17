import { highlightElement } from 'prismjs';
import { createRef, useMemo } from 'react';
import { loadLanguage } from '@/next.prism.mjs';

export const usePrismJS = (language: string) => {
  const codeRef = createRef<HTMLElement>();

  useMemo(
    () =>
      loadLanguage(language).then(
        () => codeRef.current && highlightElement(codeRef.current)
      ),
    [language, codeRef]
  );

  return codeRef;
};
