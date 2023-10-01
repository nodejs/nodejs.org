import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as Primitive from '@radix-ui/react-select';
import { useId } from 'react';
import type { FC } from 'react';

import styles from './index.module.css';

type SelectProps = {
  values: ({ label: string; value: string } | string)[];
  defaultValue?: string;
  placeholder?: string;
  dropdownLabel?: string;
  label?: string;
  onChange?: (value: string) => void;
};

const Select: FC<SelectProps> = ({
  values = [],
  defaultValue,
  placeholder,
  label,
  dropdownLabel,
  onChange,
}) => {
  const id = useId();

  return (
    <div className={styles.select}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <Primitive.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Primitive.Trigger
          className={styles.trigger}
          aria-label={label}
          id={id}
        >
          <Primitive.Value placeholder={placeholder} />
          <ChevronDownIcon className={styles.icon} />
        </Primitive.Trigger>
        <Primitive.Portal>
          <Primitive.Content className={styles.dropdown}>
            <Primitive.Viewport>
              <Primitive.Group>
                {dropdownLabel && (
                  <Primitive.Label className={`${styles.item} ${styles.label}`}>
                    {dropdownLabel}
                  </Primitive.Label>
                )}
                {values.map(item => {
                  const value = typeof item === 'string' ? item : item.value;
                  const label = typeof item === 'string' ? item : item.label;

                  return (
                    <Primitive.Item
                      key={value}
                      value={value}
                      className={`${styles.item} ${styles.text}`}
                    >
                      <Primitive.ItemText>{label}</Primitive.ItemText>
                    </Primitive.Item>
                  );
                })}
              </Primitive.Group>
            </Primitive.Viewport>
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    </div>
  );
};

export default Select;
