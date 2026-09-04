'use client';

import { useId } from 'react';

import type { FC, ReactNode } from 'react';

import { getCodeTabId, slugifyIdSegment } from './getCodeTabId';
import { getPanels } from './getPanels';
import { useCodeTabNavigation } from './useCodeTabNavigation';

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
   * `{slug(groupId)}-{slug(tabKey)}-{index}`. When omitted, a per-instance prefix is
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
    : `codetabs-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const panels = getPanels(children);
  const hasExplicitDefault = tabs.some(
    tab => (tab.value ?? tab.key) === defaultValue
  );
  const defaultKey = hasExplicitDefault
    ? defaultValue
    : (tabs[0]?.value ?? tabs[0]?.key);

  const items = tabs.map((tab, index) => {
    const tabKey = tab.value ?? tab.key;
    const tabId = getCodeTabId(instancePrefix, tabKey, index);
    const isDefault = tabKey === defaultKey;

    return { tab, tabId, isDefault, panel: panels[index] };
  });
  const { enhanced, activeIndex, linksRef, onClick, onKeyDown } =
    useCodeTabNavigation(
      items.map(item => item.tabId),
      items.findIndex(item => item.isDefault)
    );

  return (
    <div className={styles.root}>
      <div className={styles.tabList}>
        <div
          className={styles.triggers}
          role={enhanced ? 'tablist' : 'navigation'}
          aria-label="Code samples"
        >
          {items.map(({ tab, tabId, isDefault }, index) => (
            <a
              key={tab.key}
              id={`${tabId}-trigger`}
              href={`#${tabId}`}
              ref={element => {
                linksRef.current[index] = element;
              }}
              role={enhanced ? 'tab' : undefined}
              aria-controls={tabId}
              aria-selected={enhanced ? activeIndex === index : undefined}
              tabIndex={enhanced && activeIndex !== index ? -1 : 0}
              onClick={event => onClick(event, index)}
              onKeyDown={event => onKeyDown(event, index)}
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
        </div>
        {addons && <div className={styles.addons}>{addons}</div>}
      </div>
      {items.map(({ tab, tabId, isDefault, panel }) => (
        <div
          key={tab.key}
          id={tabId}
          className={styles.panel}
          role={enhanced ? 'tabpanel' : 'region'}
          tabIndex={0}
          data-default={isDefault ? 'true' : undefined}
          aria-labelledby={`${tabId}-trigger`}
        >
          {panel}
        </div>
      ))}
    </div>
  );
};

export default CodeTabs;
