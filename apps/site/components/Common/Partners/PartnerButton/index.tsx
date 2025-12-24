import Button from '#site/components/Common/Button';

import type { AnchorHTMLAttributes, FC } from 'react';

import style from './index.module.css';

type PartnerProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  size?: 'large' | 'small';
};

const PartnerButton: FC<PartnerProps> = ({
  href,
  size = 'small',
  ...props
}) => (
  <Button
    kind="secondary"
    href={`${href}/?utm_source=nodejs-website&utm_medium=Link`}
    rel="sponsored noopener"
    target="_blank"
    className={style[size]}
    {...props}
  />
);

export default PartnerButton;
