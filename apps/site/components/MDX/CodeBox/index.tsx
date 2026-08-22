import { getLanguageDisplayName } from '@node-core/rehype-shiki';
import Mermaid from '@node-core/ui-components/MDX/Mermaid';

import CodeBox from '#site/components/Common/CodeBox';

import type { FC, HTMLAttributes } from 'react';

const MDXCodeBox: FC<HTMLAttributes<HTMLElement>> = ({
  children: code,
  className,
}) => {
  // Mermaid diagrams arrive as `<pre class="mermaid">` (see rehype-mermaid),
  // so we render them as diagrams instead of code boxes
  if (className?.split(' ').includes('mermaid')) {
    return <Mermaid>{String(code)}</Mermaid>;
  }

  const matches = className?.match(/language-(?<language>[a-zA-Z]+)/);
  const language = matches?.groups?.language ?? '';

  return (
    <CodeBox language={getLanguageDisplayName(language)} className={className}>
      {code}
    </CodeBox>
  );
};

export default MDXCodeBox;
