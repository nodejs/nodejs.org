import { useCallback, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import type { FC, PropsWithChildren, MouseEvent, ReactNode } from 'react';

type ShellBoxProps = {
  children: string | ReactNode;
  textToCopy?: string;
};

const ShellBox: FC<ShellBoxProps> = ({
  children,
  textToCopy,
}: PropsWithChildren<ShellBoxProps>) => {
  const [copied, copyText] = useCopyToClipboard();

  const shellBoxRef = useRef<HTMLElement>(null);

  const handleCopyCode = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const text = textToCopy || shellBoxRef.current?.innerHTML;
      await copyText(text);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
