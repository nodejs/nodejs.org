'use client';

import {
  DocumentDuplicateIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { Fragment, isValidElement, useRef } from 'react';

import BaseButton from '#ui/Common/BaseButton';
import useCopy from '#ui/hooks/useCopy';

import type { LinkLike } from '#ui/types';
import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

import styles from './index.module.css';

// Transforms a code element with plain text content into a more structured
// format for rendering with line numbers
const transformCode = <T extends ReactElement<PropsWithChildren>>(
  code: T,
  language: string
): ReactElement<HTMLElement> | T => {
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

  const extraStyle = language.length === 0 ? { fontFamily: 'monospace' } : {};

  return (
    <code style={extraStyle}>
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

type CodeBoxProps = {
  language: string;
  className?: string;
  as?: LinkLike;
  copyButtonLabel: ReactNode;
  copiedButtonLabel: ReactNode;
};

const BaseCodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({
  children,
  language,
  className,
  copyButtonLabel,
  copiedButtonLabel,
  as = 'a',
}: PropsWithChildren<CodeBoxProps>) => {
  const [copied, copy] = useCopy();

  const containerRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => copy(containerRef.current?.textContent);
  const ButtonIcon = copied ? DocumentDuplicateIcon : CodeBracketIcon;

  return (
    <div className={styles.root}>
      <pre
        ref={containerRef}
        className={classNames(styles.content, className)}
        tabIndex={0}
      >
        {transformCode(children as ReactElement<PropsWithChildren>, language)}
      </pre>
      {language && (
        <div className={styles.footer}>
          <span className={styles.language}>{language}</span>
          <BaseButton
            as={as}
            className={styles.action}
            kind="neutral"
            onClick={handleCopy}
          >
            <ButtonIcon className="size-4" />
            {copied ? copiedButtonLabel : copyButtonLabel}
          </BaseButton>
        </div>
      )}
    </div>
  );
};

export default BaseCodeBox;
