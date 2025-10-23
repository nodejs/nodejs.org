import * as SwitchPrimitive from '@radix-ui/react-switch';
import classNames from 'classnames';
import { FC, PropsWithChildren, useId } from 'react';

import styles from './index.module.css';

type SwitchProps = SwitchPrimitive.SwitchProps & {
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  thumbClassname?: string;
};

const Switch: FC<PropsWithChildren<SwitchProps>> = ({
  label,
  checked,
  onCheckedChange,
  className,
  thumbClassname,
  ...props
}) => {
  const id = useId();

  return (
    <div className={styles.switch}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <SwitchPrimitive.Root
        id={id}
        className={classNames(styles.root, className)}
        checked={checked}
        onCheckedChange={onCheckedChange}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={classNames(styles.thumb, thumbClassname)}
        />
      </SwitchPrimitive.Root>
    </div>
  );
};

export default Switch;
