import { Children, useId } from 'react';

import type { FC, ReactNode } from 'react';

import { getCodeTabId, slugifyIdSegment } from './getCodeTabId';

import styles from './index.module.css';

type CodeTab = {
  key: string;
  label: string;
  secondaryLabel?: string;
  value?: string;
  extension?: string;
};

type CodeTabsProps = {
  tabs: Array<CodeTab>;
  defaultValue?: string;
  /**
   * Optional id prefix for this group. When set, tab fragments are
   * `{slug(groupId)}-{slug(tabKey)}`. When omitted, a per-instance prefix is
   * used so multiple CodeTabs on one page cannot collide.
   */
  groupId?: string;
  addons?: ReactNode;
  children?: ReactNode;
};

const CodeTabs: FC<CodeTabsProps> = ({
  tabs,
  defaultValue,
  groupId,
  addons,
  children,
}) => {
  const reactId = useId();
  const instancePrefix = groupId
    ? slugifyIdSegment(groupId)
    : slugifyIdSegment(`codetabs-${reactId}`);

  // Flatten fragments/arrays so each tab maps to one panel (MDX + stories).
  // eslint-disable-next-line @eslint-react/no-children-to-array
  const panels = Children.toArray(children);
  const hasExplicitDefault = tabs.some(
    tab => (tab.value ?? tab.key) === defaultValue
  );
  const defaultKey = hasExplicitDefault
    ? defaultValue
    : (tabs[0]?.value ?? tabs[0]?.key);

  const items = tabs.map((tab, index) => {
    const tabKey = tab.value ?? tab.key;
    const tabId = getCodeTabId(instancePrefix, tabKey);
    const isDefault = tabKey === defaultKey;

    return { tab, tabId, isDefault, panel: panels[index] };
  });

  return (
    <div className={styles.root}>
      <nav className={styles.tabList} aria-label="Code samples">
        {items.map(({ tab, tabId, isDefault }) => (
          <a
            key={tab.key}
            id={tabId}
            href={`#${tabId}`}
            className={styles.trigger}
            data-default={isDefault ? 'true' : undefined}
          >
            {tab.label}
            {tab.extension && (
              <span className={styles.tabExtension}>{tab.extension}</span>
            )}
            {tab.secondaryLabel ? (
              <span className={styles.tabSecondaryLabel}>
                {tab.secondaryLabel}
              </span>
            ) : null}
          </a>
        ))}
        {addons && <div className={styles.addons}>{addons}</div>}
      </nav>
      {items.map(({ tab, tabId, isDefault, panel }) => (
        <div
          key={tab.key}
          className={styles.panel}
          data-default={isDefault ? 'true' : undefined}
          aria-labelledby={tabId}
        >
          {panel}
        </div>
      ))}
    </div>
  );
};

export default CodeTabs;
