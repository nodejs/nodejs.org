'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { useEffect, useId, useMemo, useState } from 'react';

import CodeTabs from '#ui/Common/CodeTabs';

import type { FC, ReactElement } from 'react';

type MDXCodeTabsProps = {
  children: Array<ReactElement<unknown>>;
  languages: string;
  displayNames?: string;
  defaultTab?: string;
  groupId?: string;
};

const NAME_OVERRIDES: Record<string, string | undefined> = {
  mjs: 'ESM',
};

const MDXCodeTabs: FC<MDXCodeTabsProps> = ({
  languages: rawLanguages,
  displayNames: rawDisplayNames,
  children: codes,
  defaultTab = '0',
  groupId,
  ...props
}) => {
  const id = useId();
  const prefix = groupId ? `tab-${groupId}` : `tab-${id}`;

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
        anchorId: `${prefix}-${language}-${index}`.replace(
          /[^a-zA-Z0-9-_]/g,
          '-'
        ),
        label,
      };
    });

    return { tabs, languages };
  }, [rawLanguages, rawDisplayNames, prefix]);

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.slice(1);
      const matched = tabs.find(t => t.anchorId === hash);
      if (matched) {
        return matched.key;
      }
    }
    return tabs[Number(defaultTab)]?.key ?? tabs[0].key;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const matched = tabs.find(t => t.anchorId === hash);
      if (matched) {
        setActiveTab(matched.key);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [tabs]);

  const handleValueChange = (value: string) => {
    setActiveTab(value);
    const matched = tabs.find(t => t.key === value);
    if (matched) {
      window.history.replaceState(null, '', `#${matched.anchorId}`);
    }
  };

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

export default MDXCodeTabs;
