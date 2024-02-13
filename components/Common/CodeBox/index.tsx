'use client';

import {
  DocumentDuplicateIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Fragment, isValidElement, useRef } from 'react';

import Button from '@/components/Common/Button';
import { useCopyToClipboard, useNotification } from '@/hooks';
import { ENABLE_WEBSITE_REDESIGN } from '@/next.constants.mjs';

import styles from './index.module.css';

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

  // Note that since we use `.split` we will have an extra entry
  // being an empty string, so we need to remove it
  const lines = content.split('\n');

  return (
    <code style={{ fontFamily: 'monospace' }}>
      {lines
        .flatMap((line, lineIndex) => {
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
        })
        // Here we remove that empty line from before and
        // the last flatMap entry which is an `\n`
        .slice(0, -2)}
    </code>
  );
};

type CodeBoxProps = { language: string; showCopyButton?: boolean };

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({
  children,
  language,
  // For now we only want to render the Copy Button by default
  // if the Website Redesign is Enabled
  // @todo remove this check once we migrate to website redesign
  showCopyButton = ENABLE_WEBSITE_REDESIGN,
}) => {
  const ref = useRef<HTMLPreElement>(null);

  const notify = useNotification();
  const [, copyToClipboard] = useCopyToClipboard();
  const t = useTranslations();

  const onCopy = async () => {
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

  return (
    <div className={styles.root}>
      <pre ref={ref} className={styles.content} tabIndex={0}>
        {transformCode(children)}
      </pre>

      {language && (
        <div className={styles.footer}>
          <span className={styles.language}>{language}</span>

          {showCopyButton && (
            <Button kind="neutral" className={styles.action} onClick={onCopy}>
              <DocumentDuplicateIcon className={styles.icon} />
              {t('components.common.codebox.copy')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeBox;
