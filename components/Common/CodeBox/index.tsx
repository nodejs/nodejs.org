import {
  DocumentDuplicateIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Fragment, isValidElement, useMemo, useRef } from 'react';

import Button from '@/components/Common/Button';
import { useCopyToClipboard, useNotification } from '@/hooks';
import { getCodeLanguageDisplayName } from '@/util/getCodeLanguageDisplayName';

import styles from './index.module.css';

type CodeBoxProps = {
  language: string;
};

export const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({
  children,
  language,
}) => {
  const ref = useRef<HTMLPreElement>(null);

  const notify = useNotification();
  const [, copyToClipboard] = useCopyToClipboard();
  const t = useTranslations();

  const onCopy = () => {
    if (ref.current?.textContent) {
      copyToClipboard(ref.current.textContent);

      notify({
        duration: 3000,
        message: (
          <div className={styles.notification}>
            <CodeBracketIcon className={styles.icon} />
            {t('components.common.codebox.copied')}
          </div>
        ),
      });
    }
  };

  const code = useMemo(() => transformCode(children), [children]);

  return (
    <div className={styles.root}>
      <pre ref={ref} className={styles.content} tabIndex={0}>
        {code}
      </pre>
      <div className={styles.footer}>
        <span className={styles.language}>{language}</span>
        <Button type="button" className={styles.action} onClick={onCopy}>
          <DocumentDuplicateIcon className={styles.icon} />
          {t('components.common.codebox.copy')}
        </Button>
      </div>
    </div>
  );
};

type MDXCodeBoxProps = {
  className?: string;
};

export const MDXCodeBox: FC<PropsWithChildren<MDXCodeBoxProps>> = ({
  children: code,
  className,
}) => {
  const matches = className?.match(/language-(?<language>.*)/);
  const language = matches?.groups?.language ?? '';

  return (
    <CodeBox language={getCodeLanguageDisplayName(language)}>{code}</CodeBox>
  );
};

// Transforms a code element with plain text content into a more structured
// format for rendering with line numbers
const transformCode = (code: ReactNode): ReactNode => {
  if (!isValidElement(code)) {
    // Early return when the `CodeBox` child is not a valid element since the
    // type is a ReactNode, and can assume any value
    return code;
  }

  const content = code.props?.children;

  if (code.type !== 'code' || typeof content !== 'string') {
    // There is no need to transform an element that is not a code element or
    // a content that is not a string
    return code;
  }

  const lines = content.split('\n');

  return (
    <code>
      {lines.flatMap((line, lineIndex) => {
        const columns = line.split(' ');

        return [
          <span key={lineIndex} className="line">
            {columns.map((column, columnIndex) => (
              <Fragment key={columnIndex}>
                <span>{column}</span>
                {columnIndex < columns.length - 1 && <span> </span>}
              </Fragment>
            ))}
          </span>,
          // Add a break line so the text content is formatted correctly
          // when copying to clipboard
          '\n',
        ];
      })}
    </code>
  );
};
