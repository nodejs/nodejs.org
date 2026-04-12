import SignatureItem from '#ui/Common/Signature/SignatureItem';
import SignatureRoot from '#ui/Common/Signature/SignatureRoot';

import type { FC, PropsWithChildren, ReactNode } from 'react';

export type SignatureProps = {
  title?: string;
  kind?: 'default' | 'return';
  name?: string;
  type?: ReactNode;
  description?: ReactNode;
  optional?: boolean;
};

const Signature: FC<PropsWithChildren<SignatureProps>> = ({
  kind = 'default',
  name,
  type,
  description,
  optional,
  title,
  children,
}) => {
  if (title) {
    return <SignatureRoot title={title}>{children}</SignatureRoot>;
  }

  return (
    <SignatureItem
      kind={kind}
      name={name}
      type={type}
      description={description}
      optional={optional}
    >
      {children}
    </SignatureItem>
  );
};

export default Signature;
