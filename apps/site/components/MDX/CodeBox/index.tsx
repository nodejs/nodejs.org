import { getLanguageDisplayName } from '@node-core/rehype-shiki';

import CodeBox from '#site/components/Common/CodeBox';

import type { FC, HTMLAttributes } from 'react';

const MDXCodeBox: FC<HTMLAttributes<HTMLElement>> = ({
  children: code,
  className,
}) => {
  const matches = className?.match(/language-(?<language>[a-zA-Z]+)/);
  const language = matches?.groups?.language ?? '';

  return (
    <CodeBox language={getLanguageDisplayName(language)} className={className}>
      {code}
    </CodeBox>
  );
};

export default MDXCodeBox;
