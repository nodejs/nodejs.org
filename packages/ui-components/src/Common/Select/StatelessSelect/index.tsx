'use client';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useId, useMemo, useRef, useEffect } from 'react';

import type { SelectGroup, SelectProps } from '#ui/Common/Select';
import type { LinkLike } from '#ui/types';
import { isStringArray, isValuesArray } from '#ui/util/array';

import styles from '../index.module.css';

type StatelessSelectConfig = {
  as?: LinkLike | 'div';
};

export type StatelessSelectProps<T extends string> = SelectProps<T> &
  StatelessSelectConfig;

const StatelessSelect = <T extends string>({
  values = [],
  defaultValue,
  placeholder,
  label,
  inline,
  className,
  ariaLabel,
  disabled = false,
}: StatelessSelectProps<T>) => {
  const id = useId();
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  const mappedValues = useMemo(() => {
    let mappedValues = values;

    if (isStringArray(mappedValues)) {
      mappedValues = mappedValues.map(value => ({
        label: value,
        value,
      }));
    }

    if (isValuesArray(mappedValues)) {
      return [{ items: mappedValues }];
    }

    return mappedValues as Array<SelectGroup<T>>;
  }, [values]) as Array<SelectGroup<T>>;

  // Find the current/default item to display in summary
  const currentItem = useMemo(
    () =>
      mappedValues
        .flatMap(({ items }) => items)
        .find(item => item.value === defaultValue),
    [mappedValues, defaultValue]
  );

  // closing behaviour for outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(e.target as Node)
      ) {
        detailsRef.current.open = false;
      }
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, []);

  return (
    <div
      className={classNames(
        styles.select,
        styles.noscript,
        { [styles.inline]: inline },
        className
      )}
    >
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <details className={styles.trigger} id={id} ref={detailsRef}>
        <summary
          className={styles.summary}
          aria-label={ariaLabel}
          aria-disabled={disabled}
        >
          {currentItem && (
            <span className={styles.selectedValue}>
              {currentItem.iconImage}
              <span>{currentItem.label}</span>
            </span>
          )}
          {!currentItem && (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
          <ChevronDownIcon className={styles.icon} />
        </summary>

        <div
          className={classNames(styles.dropdown, { [styles.inline]: inline })}
        >
          {mappedValues.map(({ label: groupLabel, items }, groupKey) => (
            <div
              key={groupLabel?.toString() ?? groupKey}
              className={styles.group}
            >
              {groupLabel && (
                <div className={classNames(styles.item, styles.label)}>
                  {groupLabel}
                </div>
              )}

              {items.map(
                ({ value, label, iconImage, disabled: itemDisabled }) => (
                  <a
                    key={value}
                    href={value}
                    className={classNames(styles.item, styles.text, {
                      [styles.disabled]: itemDisabled || disabled,
                      [styles.selected]: value === defaultValue,
                    })}
                    aria-disabled={itemDisabled || disabled}
                    onClick={e => {
                      // Allow ctrl/cmd/middle click to open new tab
                      if (e.metaKey || e.ctrlKey || e.button === 1) {
                        return;
                      }
                      e.preventDefault();

                      if (detailsRef.current) {
                        detailsRef.current.open = false;
                      }

                      // Client-side navigation for internal links
                      if (typeof window !== 'undefined') {
                        window.location.href = value;
                      }
                    }}
                  >
                    {iconImage}
                    <span>{label}</span>
                  </a>
                )
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
};

export default StatelessSelect;
