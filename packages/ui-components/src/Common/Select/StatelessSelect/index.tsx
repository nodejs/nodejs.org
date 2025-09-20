import { ChevronDownIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useId, useMemo } from 'react';

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
  as: Component = 'div',
}: StatelessSelectProps<T>) => {
  const id = useId();

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

      <details className={styles.trigger} id={id}>
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
                  <Component
                    key={value}
                    href={value}
                    className={classNames(styles.item, styles.text, {
                      [styles.disabled]: itemDisabled || disabled,
                      [styles.selected]: value === defaultValue,
                    })}
                    aria-disabled={itemDisabled || disabled}
                  >
                    {iconImage}
                    <span>{label}</span>
                  </Component>
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
