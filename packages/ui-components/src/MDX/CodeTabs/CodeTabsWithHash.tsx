'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { useCallback, useMemo } from 'react';

import CodeTabs from '#ui/Common/CodeTabs';
import { useHashContext } from '#ui/contexts/HashContext';

import type { ComponentProps, FC } from 'react';

import MDXCodeTabs from './index';

type CodeTabsWithHashProps = ComponentProps<typeof MDXCodeTabs> & {
  groupId: string;
};

const NAME_OVERRIDES: Record<string, string | undefined> = {
  mjs: 'ESM',
};

const CodeTabsWithHash: FC<CodeTabsWithHashProps> = ({
  languages: rawLanguages,
  displayNames: rawDisplayNames,
  children: codes,
  defaultTab = '0',
  groupId,
  ...props
}) => {
  const { hash, setHash } = useHashContext();

  const { tabs, languages } = useMemo(() => {
    const occurrences: Record<string, number> = {};
    const languages = rawLanguages.split('|');
    const displayNames = rawDisplayNames?.split('|') ?? [];

    const tabs = languages.map((language, index) => {
      const base =
        displayNames[index]?.trim() ||
        NAME_OVERRIDES[language] ||
        language.toUpperCase();

      const count = occurrences[base] ?? 0;
      occurrences[base] = count + 1;

      const label = count > 0 ? `${base} (${count + 1})` : base;

      return {
        key: `${language}-${index}`,
        label,
        id: `${groupId}-${language}-${index}`.replace(/[^a-zA-Z0-9-_]/g, '-'),
      };
    });

    return { tabs, languages };
  }, [rawLanguages, rawDisplayNames, groupId]);

  const activeTab =
    tabs.find(t => t.id === hash)?.key ?? tabs[Number(defaultTab)].key;

  const handleValueChange = useCallback(
    (value: string) => {
      const matched = tabs.find(t => t.key === value);
      if (matched?.id) {
        setHash(matched.id);
      }
    },
    [tabs, setHash]
  );

  return (
    <CodeTabs
      tabs={tabs}
      value={activeTab}
      onValueChange={handleValueChange}
      {...props}
    >
      {languages.map((_, index) => (
        <TabsPrimitive.Content
          forceMount
          key={tabs[index].key}
          value={tabs[index].key}
        >
          {codes[index]}
        </TabsPrimitive.Content>
      ))}
    </CodeTabs>
  );
};
export default CodeTabsWithHash;
