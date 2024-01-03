import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { FC, ReactElement } from 'react';

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
  const languages = rawLanguages.split('|');
  const displayNames = rawDisplayNames?.split('|') ?? [];

  const tabs = languages.map((language, index) => {
    const displayName = displayNames[index];

    return {
      key: language,
      label: displayName?.length ? displayName : language.toUpperCase(),
    };
  });

  return (
    <CodeTabs tabs={tabs} defaultValue={languages[0]}>
      {languages.map((language, index) => (
        <TabsPrimitive.Content key={language} value={language}>
          {codes[index]}
        </TabsPrimitive.Content>
      ))}
    </CodeTabs>
  );
};

export default MDXCodeTabs;
