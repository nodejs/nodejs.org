import * as TabsPrimitive from '@radix-ui/react-tabs';
import { useMemo } from 'react';

import CodeTabs from '#ui/Common/CodeTabs';

import type { FC, ReactElement } from 'react';

import CodeTabsWithHash from './CodeTabsWithHash';

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
  const prefix = groupId ?? 'tab';

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

  const Component = groupId ? CodeTabsWithHash : CodeTabs;

  return (
    <Component
      tabs={tabs}
      defaultValue={tabs[Number(defaultTab)].key}
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
    </Component>
  );
};

export default MDXCodeTabs;
