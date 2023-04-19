import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import styles from './index.module.scss';
import { createRoot } from 'react-dom/client';

interface Props {
  textToCopy?: string;
}

const ShellBox = ({ children, textToCopy }: React.PropsWithChildren<Props>) => {
  const [copied, copyText] = useCopyToClipboard();

  const handleCopyCode = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const text = textToCopy
        ? textToCopy
        : // @ts-ignore - createRoot is not in the type definition
          (createRoot(document.body).render(children) as string);

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
      <code>{children}</code>
    </pre>
  );
};

export default ShellBox;
