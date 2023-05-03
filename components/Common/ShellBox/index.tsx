import { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import type { FC, PropsWithChildren, MouseEvent, ReactNode } from 'react';

type ShellBoxProps = {
  children: string | ReactNode;
  textToCopy?: string;
};

const ShellBox: FC<PropsWithChildren<ShellBoxProps>> = ({
  children,
  textToCopy,
}: PropsWithChildren<ShellBoxProps>) => {
  const [copied, copyText] = useCopyToClipboard();

  const shellBoxRef = useRef<HTMLElement>(null);

  const handleCopyCode = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // By default we want to use the textToCopy props but if it's absent
    // we allow the user to copy by getting the inner HTML content of the Element
    const _textToCopy = textToCopy || shellBoxRef.current?.innerHTML || '';

    await copyText(_textToCopy.replace('$', ''));
  };

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
