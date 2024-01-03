'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { FC, ReactElement } from 'react';
import { useState } from 'react';

import CodeTabs from '@/components/Common/CodeTabs';

type MDXCodeTabsProps = {
  children: Array<ReactElement>;
  languages: string;
  displayNames?: string;
};

const MDXCodeTabs: FC<MDXCodeTabsProps> = ({
  languages: rawLanguages,
  displayNames: rawDisplayNames,
  children: codes,
}) => {
  const [active, setActive] = useState(0);

  const languages = rawLanguages.split('|');
  const displayNames = rawDisplayNames?.split('|') ?? [];

  const tabs = languages.map((language, index) => {
    const displayName = displayNames[index];

    return {
      key: language,
      label: displayName?.length ? displayName : language.toUpperCase(),
    };
  });

  const languagesMap = Object.fromEntries(
    languages.map((language, index) => [language, index])
  );

  return (
    <CodeTabs
      tabs={tabs}
      defaultValue={languages[0]}
      onValueChange={selected => setActive(languagesMap[selected])}
    >
      {languages.map(language => (
        <TabsPrimitive.Content key={language} value={language}>
          {codes[active]}
        </TabsPrimitive.Content>
      ))}
    </CodeTabs>
  );
};

export default MDXCodeTabs;
