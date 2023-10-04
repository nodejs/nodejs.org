import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as Primitive from '@radix-ui/react-select';
import classNames from 'classnames';
import Image from 'next/image';
import { useId, useMemo } from 'react';
import type { FC } from 'react';

import styles from './index.module.css';

type SelectValue = {
  label: string;
  value: string;
  iconImageUrl?: string;
};

type SelectProps = {
  values: SelectValue[] | string[];
  defaultValue?: string;
  placeholder?: string;
  dropdownLabel?: string;
  label?: string;
  inline?: boolean;
  onChange?: (value: string) => void;
};

const Select: FC<SelectProps> = ({
  values = [],
  defaultValue,
  placeholder,
  label,
  dropdownLabel,
  inline,
  onChange,
}) => {
  const id = useId();
  const mappedValues: SelectValue[] = useMemo(() => {
    if (!values.length) {
      return [];
    }

    const [firstItem, ...items] = values;

    if (typeof firstItem === 'string') {
      return [firstItem, ...(items as string[])].map(value => ({
        value,
        label: value,
      }));
    }

    if (typeof firstItem === 'object') {
      return [firstItem, ...(items as SelectValue[])];
    }

    return [];
  }, [values]);

  return (
    <div className={classNames(styles.select, { [styles.inline]: inline })}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <Primitive.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Primitive.Trigger
          className={styles.trigger}
          aria-label={label || dropdownLabel}
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
              <Primitive.Group>
                {dropdownLabel && (
                  <Primitive.Label className={`${styles.item} ${styles.label}`}>
                    {dropdownLabel}
                  </Primitive.Label>
                )}
                {mappedValues.map(({ value, label, iconImageUrl }) => (
                  <Primitive.Item
                    key={value}
                    value={value}
                    className={`${styles.item} ${styles.text}`}
                  >
                    <Primitive.ItemText>
                      {iconImageUrl && (
                        <Image
                          src={iconImageUrl}
                          alt={label}
                          width={16}
                          height={16}
                        />
                      )}
                      {label}
                    </Primitive.ItemText>
                  </Primitive.Item>
                ))}
              </Primitive.Group>
            </Primitive.Viewport>
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    </div>
  );
};

export default Select;
