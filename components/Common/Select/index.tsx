'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as Primitive from '@radix-ui/react-select';
import classNames from 'classnames';
import { useId, useMemo } from 'react';
import type { FC } from 'react';

import type { FormattedMessage } from '@/types';

import styles from './index.module.css';

type SelectValue = {
  label: FormattedMessage;
  value: string;
  iconImage?: React.ReactNode;
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
};

const Select: FC<SelectProps> = ({
  values = [],
  defaultValue,
  placeholder,
  label,
  inline,
  onChange,
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
    <div className={classNames(styles.select, { [styles.inline]: inline })}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <Primitive.Root value={defaultValue} onValueChange={onChange}>
        <Primitive.Trigger
          className={styles.trigger}
          aria-label={label}
          id={id}
        >
          <Primitive.Value placeholder={placeholder} />
          <ChevronDownIcon className={styles.icon} />
        </Primitive.Trigger>
        <Primitive.Portal>
          <Primitive.Content
            position={inline ? 'popper' : 'item-aligned'}
            className={classNames(styles.dropdown, { [styles.inline]: inline })}
          >
            <Primitive.Viewport>
              {mappedValues.map(({ label, items }, key) => (
                <Primitive.Group key={label?.toString() || key}>
                  {label && (
                    <Primitive.Label
                      className={classNames(styles.item, styles.label)}
                    >
                      {label}
                    </Primitive.Label>
                  )}

                  {items.map(({ value, label, iconImage }) => (
                    <Primitive.Item
                      key={value}
                      value={value}
                      className={classNames(styles.item, styles.text)}
                    >
                      <Primitive.ItemText>
                        {iconImage}
                        {label}
                      </Primitive.ItemText>
                    </Primitive.Item>
                  ))}
                </Primitive.Group>
              ))}
            </Primitive.Viewport>
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    </div>
  );
};

export default Select;
