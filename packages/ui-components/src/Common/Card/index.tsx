import type { ComponentPropsWithRef, FC } from 'react';

import styles from './index.module.css';

type CardProps = ComponentPropsWithRef<'div'>;

export const Card: FC<CardProps> = ({ className, ...props }) => {
  return <div className={`${styles.card} ${className || ''}`} {...props} />;
};

export const CardHeader: FC<CardProps> = ({ className, ...props }) => {
  return <div className={`${styles.header} ${className || ''}`} {...props} />;
};

export const CardBody: FC<CardProps> = ({ className, ...props }) => {
  return <div className={`${styles.body} ${className || ''}`} {...props} />;
};
