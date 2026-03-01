import { useId } from 'react';

import type Signature from '#ui/Common/Signature';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type SignatureRootProps = Pick<ComponentProps<typeof Signature>, 'title'>;

const SignatureRoot: FC<PropsWithChildren<SignatureRootProps>> = ({
  title,
  children,
}) => {
  const titleId = useId();

  return (
    <section className={styles.container} aria-labelledby={titleId}>
      <div className={styles.title} id={titleId}>
        {title}
      </div>
      <div className={styles.root}>{children}</div>
    </section>
  );
};

export default SignatureRoot;
