import classNames from 'classnames';

import type { FC, PropsWithChildren, InputHTMLAttributes } from 'react';

import styles from './index.module.css';

type SwitchProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  thumbClassName?: string;
};

const Switch: FC<PropsWithChildren<SwitchProps>> = ({
  label,
  className,
  thumbClassName,
  id,
  ...props
}) => {
  return (
    <label className={styles.switch}>
      {label && <span className={styles.label}>{label}</span>}
      <input id={id} type="checkbox" className={styles.input} {...props} />
      <div className={classNames(styles.root, className)}>
        <div className={classNames(styles.thumb, thumbClassName)} />
      </div>
    </label>
  );
};

export default Switch;
