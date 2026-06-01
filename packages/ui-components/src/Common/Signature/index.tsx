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
  // A Signature without its own name or type is the grouping container, with
  // an optional title. Everything else renders as an individual item.
  if (!name && !type) {
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
