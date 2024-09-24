'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as ScrollPrimitive from '@radix-ui/react-scroll-area';
import * as SelectPrimitive from '@radix-ui/react-select';
import classNames from 'classnames';
import { useId, useMemo } from 'react';
import type { FC } from 'react';

import type { FormattedMessage } from '@/types';

import styles from './index.module.css';

type SelectValue = {
  label: FormattedMessage;
  value: string;
  iconImage?: React.ReactNode;
  disabled?: boolean;
};

type SelectGroup = {
  label?: FormattedMessage;
  items: Array<SelectValue>;
};

const isStringArray = (values: Array<unknown>): values is Array<string> =>
  Boolean(values[0] && typeof values[0] === 'string');

const isValuesArray = (values: Array<unknown>): values is Array<SelectValue> =>
  Boolean(values[0] && typeof values[0] === 'object' && 'value' in values[0]);

type SelectProps = {
  values: Array<SelectGroup> | Array<SelectValue> | Array<string>;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  inline?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  ariaLabel?: string;
};

const Select: FC<SelectProps> = ({
  values = [],
  defaultValue,
  placeholder,
  label,
  inline,
  onChange,
  className,
  ariaLabel,
}) => {
  const id = useId();

  const mappedValues = useMemo(() => {
    let mappedValues = values;

    if (isStringArray(mappedValues)) {
      mappedValues = mappedValues.map(value => ({ label: value, value }));
    }

    if (isValuesArray(mappedValues)) {
      return [{ items: mappedValues }];
    }

    return mappedValues;
  }, [values]);

  return (
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

      <SelectPrimitive.Root value={defaultValue} onValueChange={onChange}>
        <SelectPrimitive.Trigger
          className={styles.trigger}
          aria-label={ariaLabel}
          id={id}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <ChevronDownIcon className={styles.icon} />
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position={inline ? 'popper' : 'item-aligned'}
            className={classNames(styles.dropdown, { [styles.inline]: inline })}
          >
            <ScrollPrimitive.Root type="auto">
              <SelectPrimitive.Viewport>
                <ScrollPrimitive.Viewport>
                  {mappedValues.map(({ label, items }, key) => (
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
                  ))}
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
  );
};

export default Select;
