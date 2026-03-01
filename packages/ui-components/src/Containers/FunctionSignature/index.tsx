import Signature from '#ui/Common/Signature';

import type { ComponentProps, FC } from 'react';

type SignatureDefinition = Omit<
  ComponentProps<typeof Signature>,
  'children'
> & {
  children?: Array<SignatureDefinition>;
};

type FunctionSignatureProps = {
  title?: string;
  items: Array<SignatureDefinition>;
};

const renderSignature = (param: SignatureDefinition, index: number) => (
  <Signature
    key={`${param.name}-${index}`}
    name={param.name}
    type={param.type}
    optional={param.optional}
    description={param.description}
    kind={param.kind}
  >
    {param.children?.map((child, i) => renderSignature(child, i))}
  </Signature>
);

const FunctionSignature: FC<FunctionSignatureProps> = ({ title, items }) => {
  if (title) {
    return (
      <Signature title={title}>
        {items.map((param, i) => renderSignature(param, i))}
      </Signature>
    );
  }

  return items.map((param, i) => renderSignature(param, i));
};

export default FunctionSignature;
