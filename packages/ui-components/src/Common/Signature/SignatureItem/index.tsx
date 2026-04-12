import classNames from 'classnames';

import SignatureHeader from '#ui/Common/Signature/SignatureHeader';

import type Signature from '#ui/Common/Signature';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type SignatureItemProps = Omit<ComponentProps<typeof Signature>, 'title'>;

const SignatureItem: FC<PropsWithChildren<SignatureItemProps>> = ({
  kind = 'default',
  name,
  type,
  description,
  optional,
  children,
}) => (
  <div
    className={classNames(styles.item, {
      [styles.return]: kind === 'return',
    })}
  >
    <SignatureHeader
      name={name}
      type={type}
      optional={optional}
      isReturn={kind === 'return'}
    />
    {description && <div className={styles.description}>{description}</div>}
    {children && <div className={styles.children}>{children}</div>}
  </div>
);

export default SignatureItem;
