import React, { useCallback, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';

type Props = {
  textToCopy?: string;
};

const ShellBox = ({ children, textToCopy }: React.PropsWithChildren<Props>) => {
  const [copied, copyText] = useCopyToClipboard();

  const shellBoxRef = useRef<HTMLElement>(null);

  const handleCopyCode = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const text = textToCopy || shellBoxRef.current?.innerHTML;
      await copyText(text);
    },

    [textToCopy, children, copyText]
  );

  return (
    <pre className={styles.shellBox}>
      <div className={styles.top}>
        <span>SHELL</span>
        <button type="button" onClick={handleCopyCode}>
          <FormattedMessage
            id="components.common.shellBox.copy"
            values={{ copied }}
          />
        </button>
      </div>
      <code ref={shellBoxRef}>{children}</code>
    </pre>
  );
};

export default ShellBox;
