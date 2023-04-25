import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-bash';
import { sanitize } from 'isomorphic-dompurify';
import classnames from 'classnames';
import styles from './index.module.scss';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import type { FC, PropsWithChildren, ReactElement, MouseEvent } from 'react';

type CodeBoxProps = {
  children: ReactElement<PropsWithChildren<{ className?: string }>>;
};

export const replaceLabelLanguages = (language: string) =>
  language.replace(/console/i, 'bash');

export const replaceLanguages = (language: string) =>
  language
    .replace(/mjs|cjs|javascript/i, 'js')
    .replace(/console|shell/i, 'bash');

const Codebox: FC<CodeBoxProps> = ({ children: { props } }) => {
  const [parsedCode, setParsedCode] = useState('');
  const [copied, copyText] = useCopyToClipboard();
  const [langIndex, setLangIndex] = useState(0);

  const className = props.className || 'text';
  // Language Matches in class
  const matches = className.match(/language-(?<lang>.*)/);
  const languageOptions = (matches?.groups?.lang || 'text').split('|');
  const language = languageOptions[langIndex];
  const codeArray = props.children
    ? props.children.toString().split('--------------\n')
    : [''];

  const handleCopyCode = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    copyText(codeArray[langIndex]);
  };

  useEffect(() => {
    const parsedLanguage = replaceLanguages(language);
    const prismLanguage = languages[parsedLanguage] || languages.text;

    setParsedCode(
      sanitize(highlight(codeArray[langIndex], prismLanguage, parsedLanguage))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langIndex]);

  return (
    <pre className={classnames(styles.pre, replaceLanguages(className))}>
      <div className={styles.top}>
        <div className={styles.langBox}>
          {languageOptions.map((lang, index) => (
            <button
              type="button"
              key={lang}
              className={styles.lang}
              onClick={() => setLangIndex(index)}
            >
              {replaceLabelLanguages(lang.toLowerCase())}
            </button>
          ))}
        </div>
        <button type="button" className={styles.copy} onClick={handleCopyCode}>
          <FormattedMessage id="components.codeBox.copy" values={{ copied }} />
        </button>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: parsedCode }}
      />
    </pre>
  );
};

export default Codebox;
