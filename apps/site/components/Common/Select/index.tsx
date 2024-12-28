'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as ScrollPrimitive from '@radix-ui/react-scroll-area';
import * as SelectPrimitive from '@radix-ui/react-select';
import classNames from 'classnames';
import { useEffect, useId, useMemo, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

import Skeleton from '@/components/Common/Skeleton';
import type { FormattedMessage } from '@/types';

import styles from './index.module.css';

export type SelectValue<T extends string> = {
  label: FormattedMessage | string;
  value: T;
  iconImage?: ReactElement<SVGSVGElement>;
  disabled?: boolean;
};

export type SelectGroup<T extends string> = {
  label?: FormattedMessage | string;
  items: Array<SelectValue<T>>;
};

const isStringArray = (values: Array<unknown>): values is Array<string> =>
  Boolean(values[0] && typeof values[0] === 'string');

const isValuesArray = <T extends string>(
  values: Array<unknown>
): values is Array<SelectValue<T>> =>
  Boolean(values[0] && typeof values[0] === 'object' && 'value' in values[0]);

type SelectProps<T extends string> = {
  values: Array<SelectGroup<T>> | Array<T> | Array<SelectValue<T>>;
  defaultValue?: T;
  placeholder?: string;
  label?: string;
  inline?: boolean;
  onChange?: (value: T) => void;
  className?: string;
  ariaLabel?: string;
  loading?: boolean;
  disabled?: boolean;
};

const Select = <T extends string>({
  values = [],
  defaultValue,
  placeholder,
  label,
  inline,
  onChange,
  className,
  ariaLabel,
  loading = false,
  disabled = false,
}: SelectProps<T>): ReactNode => {
  const id = useId();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => setValue(defaultValue), [defaultValue]);

  const mappedValues = useMemo(() => {
    let mappedValues = values;

    if (isStringArray(mappedValues)) {
      mappedValues = mappedValues.map(value => ({ label: value, value }));
    }

    if (isValuesArray(mappedValues)) {
      return [{ items: mappedValues }];
    }

    return mappedValues as Array<SelectGroup<T>>;
  }, [values]);

  // We render the actual item slotted to fix/prevent the issue
  // of the tirgger flashing on the initial render
  const currentItem = useMemo(
    () =>
      mappedValues
        .flatMap(({ items }) => items)
        .find(item => item.value === value),
    [mappedValues, value]
  );

  const memoizedMappedValues = useMemo(() => {
    return mappedValues.map(({ label, items }, key) => (
      <SelectPrimitive.Group key={label?.toString() ?? key}>
        {label && (
          <SelectPrimitive.Label
            className={classNames(styles.item, styles.label)}
          >
            {label}
          </SelectPrimitive.Label>
        )}

        {items.map(({ value, label, iconImage, disabled }) => (
          <SelectPrimitive.Item
            key={value}
            value={value}
            disabled={disabled}
            className={classNames(styles.item, styles.text)}
          >
            <SelectPrimitive.ItemText>
              {iconImage}
              <span>{label}</span>
            </SelectPrimitive.ItemText>
          </SelectPrimitive.Item>
        ))}
      </SelectPrimitive.Group>
    ));
    // We explicitly want to recalculate these values only when the values themselves changed
    // This is to prevent re-rendering and re-calcukating the values on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(values)]);

  // Both change the internal state and emit the change event
  const handleChange = (value: T) => {
    setValue(value);

    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  return (
    <Skeleton loading={loading}>
      <span
        className={classNames(
          styles.select,
          { [styles.inline]: inline },
          className
        )}
      >
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}

        <SelectPrimitive.Root
          value={currentItem !== undefined ? value : undefined}
          onValueChange={handleChange}
          disabled={disabled}
        >
          <SelectPrimitive.Trigger
            className={styles.trigger}
            aria-label={ariaLabel}
            id={id}
          >
            <SelectPrimitive.Value placeholder={placeholder}>
              {currentItem !== undefined && (
                <>
                  {currentItem.iconImage}
                  <span>{currentItem.label}</span>
                </>
              )}
            </SelectPrimitive.Value>
            <ChevronDownIcon className={styles.icon} />
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              position={inline ? 'popper' : 'item-aligned'}
              className={classNames(styles.dropdown, {
                [styles.inline]: inline,
              })}
            >
              <ScrollPrimitive.Root type="auto">
                <SelectPrimitive.Viewport>
                  <ScrollPrimitive.Viewport>
                    {memoizedMappedValues}
                  </ScrollPrimitive.Viewport>
                </SelectPrimitive.Viewport>
                <ScrollPrimitive.Scrollbar orientation="vertical">
                  <ScrollPrimitive.Thumb />
                </ScrollPrimitive.Scrollbar>
              </ScrollPrimitive.Root>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </span>
    </Skeleton>
  );
};

export default Select;
