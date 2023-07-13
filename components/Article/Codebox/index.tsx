import { useMemo, useState } from 'react';
import classnames from 'classnames';
import { TbCopy, TbCheck } from 'react-icons/tb';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { usePrismJS } from '@/hooks/usePrismJS';
import type { FC, PropsWithChildren, ReactElement, MouseEvent } from 'react';

import styles from './index.module.scss';

type CodeBoxProps = {
  children: ReactElement<PropsWithChildren<{ className?: string }>>;
  textToCopy?: string[];
  hideHeader?: boolean;
};

export const replaceLabelLanguages = (language: string) =>
  language.replace(/console/i, 'bash').replace('language-', '');

export const replaceLanguages = (language: string) =>
  language
    .replace(/mjs|cjs|javascript/i, 'js')
    .replace(/console|shell/i, 'bash');

const Codebox: FC<CodeBoxProps> = ({
  children: {
    props: { children: sourceCode, className = 'language-text' },
  },
  textToCopy,
  hideHeader = false,
}) => {
  const [copied, copyText] = useCopyToClipboard();
  const [langIndex, setLangIndex] = useState(0);

  const languageOptions = className.split('|');

  const language = replaceLanguages(languageOptions[langIndex]);

  const codeRef = usePrismJS(language);

  const codeArray = useMemo(
    () => sourceCode?.toString().split('--------------\n') || [''],
    [sourceCode]
  );

  const handleCopyCode = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const _textToCopy = textToCopy
      ? textToCopy[langIndex]
      : codeArray[langIndex];

    copyText(_textToCopy.replace(/^\$ /, '').trim());
  };

  const copyButton = (
    <button
      type="button"
      className={styles.copy}
      onClick={handleCopyCode}
      aria-hidden={true}
    >
      {copied ? <TbCheck /> : <TbCopy />}
    </button>
  );

  const containerClasses = classnames(styles.pre, className, {
    [styles.inlineCode]: hideHeader,
  });

  const codeClasses = classnames(language, styles.content);

  return (
    <pre className={containerClasses}>
      <div className={styles.header}>
        <div className={styles.langBox}>
          {languageOptions.map((lang, index) => {
            const langClasses = classnames(styles.lang, {
              [styles.selected]: index === langIndex,
            });

            return (
              <button
                type="button"
                key={lang}
                className={langClasses}
                onClick={() => setLangIndex(index)}
                data-selected={index === langIndex}
              >
                {replaceLabelLanguages(lang.toLowerCase())}
              </button>
            );
          })}
        </div>

        {copyButton}
      </div>

      {hideHeader && copyButton}

      <code ref={codeRef} className={codeClasses}>
        {codeArray[langIndex]}
      </code>
    </pre>
  );
};

export default Codebox;
