import {
  CodeBracketIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import type { Lang } from 'shiki';
import { getHighlighter, setCDN } from 'shiki';

import Button from '@/components/Common/Button';
import Notification from '@/components/Common/Notification';
import Tabs from '@/components/Common/Tabs';
import NavItem from '@/components/sections/NavItem';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

import styles from './index.module.css';

type CodeSnippet = {
  code: string;
  title: string;
  language: string;
  lang: Lang;
};

type CodeBoxProps = {
  link?: {
    text: string;
    url: string;
  };
  codeSnippets: Array<CodeSnippet>;
};

const CodeBox: FC<CodeBoxProps> = ({ link, codeSnippets }) => {
  const [active, setActive] = useState<CodeSnippet>(codeSnippets[0]);
  const codeRef = useRef<HTMLDivElement>(null);
  const [copied, copy] = useCopyToClipboard();

  useEffect(() => {
    setCDN('https://unpkg.com/shiki');
    getHighlighter({
      theme: 'nord',
      langs: [active.lang],
    }).then(highlighter => {
      const code = highlighter.codeToHtml(active.code, {
        lang: active.language.toLowerCase(),
      });
      if (codeRef.current) {
        codeRef.current.innerHTML = code;
      }
    });
  }, [active]);

  const copyCode = () => {
    copy(active.code);
  };

  const onTabChange = (value: string) => {
    const snippet = codeSnippets.find(snippet => snippet.title === value)!;
    setActive(snippet);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Tabs
          tabs={codeSnippets.map(item => {
            return {
              key: item.title,
              label: item.title,
            };
          })}
          onValueChange={onTabChange}
          value={active.title}
        />
        {link && <NavItem href={link.url}>{link.text}</NavItem>}
      </div>

      <div className={styles.body} ref={codeRef}></div>

      <div className={styles.footer}>
        <div>{active.language}</div>
        <Button className="flex items-center gap-2" onClick={copyCode}>
          <DocumentDuplicateIcon className={styles.copyIcon} />
          <FormattedMessage id="components.common.codebox.copy" />
        </Button>
      </div>
      <Notification open={copied}>
        <div className="flex items-center gap-3">
          <CodeBracketIcon className="h-4 w-4" />
          <FormattedMessage id="components.common.codebox.copied" />
        </div>
      </Notification>
    </div>
  );
};

export default CodeBox;
