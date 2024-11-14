'use client';

import classNames from 'classnames';
import type {
  ElementType,
  FC,
  PropsWithChildren,
  ReactNode,
  RefObject,
} from 'react';
import { Fragment, isValidElement, useRef } from 'react';

import styles from './index.module.css';

// Transforms a code element with plain text content into a more structured
// format for rendering with line numbers
const transformCode = (code: ReactNode, language: string): ReactNode => {
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
  CopyButton?: ElementType<CopyButtonProps>;
  className?: string;
};

export type CopyButtonProps = {
  ref: RefObject<HTMLPreElement>;
  styles: { [key: string]: string };
};

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({
  children,
  language,
  className,
  CopyButton,
}) => {
  const ref = useRef<HTMLPreElement>(null);

  return (
    <div className={styles.root}>
      <pre
        ref={ref}
        className={classNames(styles.content, className)}
        tabIndex={0}
        dir="ltr"
      >
        {transformCode(children, language)}
      </pre>

      {language && (
        <div className={styles.footer}>
          <span className={styles.language}>{language}</span>

          {CopyButton && <CopyButton styles={styles} ref={ref} />}
        </div>
      )}
    </div>
  );
};

export default CodeBox;
