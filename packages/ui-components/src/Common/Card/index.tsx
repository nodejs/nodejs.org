import classNames from 'classnames';
import type { ComponentPropsWithRef, FC } from 'react';

import styles from './index.module.css';

type CardProps = ComponentPropsWithRef<'div'>;

export const Card: FC<CardProps> = ({ className, ...props }) => {
  return <div className={classNames(styles.card, className)} {...props} />;
};

export const CardHeader: FC<CardProps> = ({ className, ...props }) => {
  return <div className={classNames(styles.header, className)} {...props} />;
};

export const CardBody: FC<CardProps> = ({ className, ...props }) => {
  return <div className={classNames(styles.body, className)} {...props} />;
};
