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
    const attributes: Array<SignatureDefinition> = [];
    const returnTypes: Array<SignatureDefinition> = [];

    for (const item of items) {
      const target = item.kind === 'return' ? returnTypes : attributes;

      target.push(item);
    }

    return (
      <>
        <Signature title={title}>
          {attributes.map((param, i) => renderSignature(param, i))}
        </Signature>

        {returnTypes.length > 0 &&
          returnTypes.map((param, i) =>
            renderSignature(param, attributes.length + i)
          )}
      </>
    );
  }

  return items.map((param, i) => renderSignature(param, i));
};

export default FunctionSignature;
