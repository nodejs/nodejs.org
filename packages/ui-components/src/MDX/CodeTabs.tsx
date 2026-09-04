import { useMemo } from 'react';

import CodeTabs from '#ui/Common/CodeTabs';

import type { FC, ReactElement } from 'react';

type MDXCodeTabsProps = {
  children: Array<ReactElement<unknown>>;
  languages: string;
  displayNames?: string;
  defaultTab?: string;
  /**
   * Optional fragment prefix. Tab ids become `{slug(groupId)}-{language}-{index}`.
   * When omitted, a unique per-instance prefix is used so multiple CodeTabs
   * on one page do not collide.
   */
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
  const { tabs } = useMemo(() => {
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
      };
    });

    return { tabs };
  }, [rawLanguages, rawDisplayNames]);

  return (
    <CodeTabs
      tabs={tabs}
      defaultValue={tabs[Number(defaultTab)]?.key ?? tabs[0]?.key}
      groupId={groupId}
      {...props}
    >
      {codes}
    </CodeTabs>
  );
};

export default MDXCodeTabs;
