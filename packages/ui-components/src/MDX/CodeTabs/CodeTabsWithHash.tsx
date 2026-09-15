'use client';

import { useCallback, useState } from 'react';

import CodeTabs from '#ui/Common/CodeTabs';
import { useHashContext } from '#ui/contexts/HashContext';

import type { ComponentProps, FC } from 'react';

type CodeTabsWithHashProps = Omit<ComponentProps<typeof CodeTabs>, 'tabs'> & {
  tabs: Array<{ key: string; label: string; id?: string }>;
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
    const matched = tabs.find(t => t.id === hash);
    if (matched && matched.key !== activeTab) {
      setActiveTab(matched.key);
    }
  }

  const handleValueChange = useCallback(
    (value: string) => {
      setActiveTab(value);
      const matched = tabs.find(t => t.key === value);
      if (matched?.id) {
        setHash(matched.id);
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
