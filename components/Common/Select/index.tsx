import { randomBytes } from 'crypto';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as Primitive from '@radix-ui/react-select';
import { useId, useMemo } from 'react';
import type { FC } from 'react';

import styles from './index.module.css';

type SelectProps = {
  values: string[];
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
  const componentKey = useMemo(() => randomBytes(16).toString('hex'), []);

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
                {values.map(value => (
                  <Primitive.Item
                    key={`select-${componentKey}-${value}`}
                    value={value}
                    className={`${styles.item} ${styles.text}`}
                  >
                    <Primitive.ItemText>{value}</Primitive.ItemText>
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
