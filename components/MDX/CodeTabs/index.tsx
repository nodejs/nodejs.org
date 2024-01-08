'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ComponentProps, FC, ReactElement } from 'react';

import CodeTabs from '@/components/Common/CodeTabs';

type MDXCodeTabsProps = Pick<
  ComponentProps<typeof CodeTabs>,
  'linkText' | 'linkUrl'
> & {
  children: Array<ReactElement>;
  languages: string;
  displayNames?: string;
  defaultTab?: string;
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

  const tabs = languages.map((language, index) => {
    const displayName = displayNames[index];

    return {
      key: `${language}-${index}`,
      label: displayName?.length ? displayName : language.toUpperCase(),
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
