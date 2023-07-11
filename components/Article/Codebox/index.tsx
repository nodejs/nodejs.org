import { useEffect, useState } from 'react';
import { highlight, languages } from 'prismjs';
import classnames from 'classnames';
import { TbCopy, TbCheck } from 'react-icons/tb';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import type { FC, PropsWithChildren, ReactElement, MouseEvent } from 'react';
import 'prismjs/components/prism-bash';

import styles from './index.module.scss';

type CodeBoxProps = {
  children: ReactElement<PropsWithChildren<{ className?: string }>>;
  textToCopy?: string[];
  hideHeader?: boolean;
};

export const replaceLabelLanguages = (language: string) =>
  language.replace(/console/i, 'bash');

export const replaceLanguages = (language: string) =>
  language
    .replace(/mjs|cjs|javascript/i, 'js')
    .replace(/console|shell/i, 'bash');

const Codebox: FC<CodeBoxProps> = ({
  children: { props },
  textToCopy,
  hideHeader = false,
}) => {
  const [parsedCode, setParsedCode] = useState('');
  const [copied, copyText] = useCopyToClipboard();
  const [langIndex, setLangIndex] = useState(0);

  const className = props.className || 'text';

  const languageOptions = className
    .split('|')
    .map(language => language.split('language-')[1]);

  const language = languageOptions[langIndex];

  const codeArray = props.children
    ? props.children.toString().split('--------------\n')
    : [''];

  const handleCopyCode = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const _textToCopy = textToCopy
      ? textToCopy[langIndex]
      : codeArray[langIndex];

    copyText(_textToCopy.replace('$', '').trim());
  };

  useEffect(() => {
    const parsedLanguage = replaceLanguages(language);
    const prismLanguage = languages[parsedLanguage] || languages.text;

    setParsedCode(
      highlight(codeArray[langIndex], prismLanguage, parsedLanguage)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langIndex, codeArray]);

  const copyButton = (
    <button
      type="button"
      className={styles.copy}
      onClick={handleCopyCode}
      data-testid="copy"
    >
      {copied ? <TbCheck /> : <TbCopy />}
    </button>
  );

  const containerClasses = classnames(styles.pre, replaceLanguages(className), {
    [styles.inlineCode]: hideHeader,
  });

  return (
    <pre className={containerClasses}>
      <div className={styles.header}>
        <div className={styles.langBox}>
          {languageOptions.map((lang, index) => (
            <button
              type="button"
              key={lang}
              className={classnames(styles.lang, {
                [styles.selected]: index === langIndex,
              })}
              onClick={() => setLangIndex(index)}
            >
              {replaceLabelLanguages(lang.toLowerCase())}
            </button>
          ))}
        </div>

        {copyButton}
      </div>

      {hideHeader && copyButton}

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: parsedCode }}
      />
    </pre>
  );
};

export default Codebox;
