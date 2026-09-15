'use client';

import { useCallback, useState } from 'react';

import CodeTabs from '#ui/Common/CodeTabs';
import { useHashContext } from '#ui/contexts/HashContext';

import type { ComponentProps, FC } from 'react';

type CodeTabsWithHashProps = Omit<ComponentProps<typeof CodeTabs>, 'tabs'> & {
  tabs: Array<{ key: string; label: string; anchorId: string }>;
};

const CodeTabsWithHash: FC<CodeTabsWithHashProps> = ({
  tabs,
  defaultValue,
  ...props
}) => {
  const { hash, setHash } = useHashContext();
  const [activeTab, setActiveTab] = useState(defaultValue);
  const [prevHash, setPrevHash] = useState(hash);

  if (hash !== prevHash) {
    setPrevHash(hash);
    const matched = tabs.find(t => t.anchorId === hash);
    if (matched && matched.key !== activeTab) {
      setActiveTab(matched.key);
    }
  }

  const handleValueChange = useCallback(
    (value: string) => {
      setActiveTab(value);
      const matched = tabs.find(t => t.key === value);
      if (matched) {
        setHash(matched.anchorId);
      }
    },
    [tabs, setHash]
  );

  return (
    <CodeTabs
      {...props}
      tabs={tabs}
      value={activeTab}
      onValueChange={handleValueChange}
    />
  );
};

export default CodeTabsWithHash;
