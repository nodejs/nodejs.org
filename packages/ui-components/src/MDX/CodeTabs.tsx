import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { FC, ReactElement } from 'react';

import CodeTabs from '#ui/Common/CodeTabs';

type MDXCodeTabsProps = {
  children: Array<ReactElement<unknown>>;
  languages: string;
  displayNames?: string;
  defaultTab?: string;
};

const NAME_OVERRIDES: Record<string, string | undefined> = {
  mjs: 'ESM',
};

const MDXCodeTabs: FC<MDXCodeTabsProps> = ({
  languages: rawLanguages,
  displayNames: rawDisplayNames,
  children: codes,
  defaultTab = '0',
  ...props
}) => {
  const languages = rawLanguages.split('|');
  const displayNames = rawDisplayNames?.split('|') ?? [];

  const occurrences: Record<string, number> = {};

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
      label: label,
    };
  });

  return (
    <CodeTabs
      tabs={tabs}
      defaultValue={tabs[Number(defaultTab)].key}
      {...props}
    >
      {languages.map((_, index) => (
        <TabsPrimitive.Content key={tabs[index].key} value={tabs[index].key}>
          {codes[index]}
        </TabsPrimitive.Content>
      ))}
    </CodeTabs>
  );
};

export default MDXCodeTabs;
