import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import type {
  ComponentProps,
  FC,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { useMemo, useState } from 'react';

import Tabs from '@/components/Common/Tabs';
import { Link } from '@/navigation.mjs';

import styles from './index.module.css';

type CodeTabsProps = Pick<
  ComponentProps<typeof Tabs>,
  'tabs' | 'onValueChange' | 'defaultValue'
> & {
  linkUrl?: string;
  linkText?: string;
};

export const CodeTabs: FC<PropsWithChildren<CodeTabsProps>> = ({
  children,
  linkUrl,
  linkText,
  ...props
}) => (
  <Tabs
    {...props}
    className={styles.root}
    headerClassName={styles.header}
    addons={
      linkUrl &&
      linkText && (
        <Link className={styles.link} href={linkUrl}>
          {linkText}
          <ArrowUpRightIcon className={styles.icon} />
        </Link>
      )
    }
  >
    {children}
  </Tabs>
);

type MDXCodeTabsProps = {
  children: Array<ReactElement>;
  languages: string;
  displayNames?: string;
};

export const MDXCodeTabs: FC<MDXCodeTabsProps> = props => {
  const {
    languages: rawLanguages,
    displayNames: rawDisplayNames,
    children: codes,
  } = props;

  const [active, setActive] = useState(0);

  const languages = useMemo(() => rawLanguages.split('|'), [rawLanguages]);
  const displayNames = useMemo(
    () => rawDisplayNames?.split('|') ?? [],
    [rawDisplayNames]
  );

  const tabs = useMemo(
    () =>
      languages.map((language, index) => {
        const displayName = displayNames[index];

        return {
          key: language,
          label: displayName?.length ? displayName : language.toUpperCase(),
        };
      }),
    [displayNames, languages]
  );

  const languagesMap = useMemo(
    () =>
      Object.fromEntries(languages.map((language, index) => [language, index])),
    [languages]
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
