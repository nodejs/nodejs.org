import CodeBox from '@node-core/ui-components/Common/CodeBox';
import type { FC, PropsWithChildren } from 'react';

import CopyButton from '@/components/Common/CopyButton';
import { getLanguageDisplayName } from '@/util/getLanguageDisplayName';

type CodeBoxProps = { className?: string; showCopyButton?: string };

const MDXCodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({
  children: code,
  className,
  showCopyButton = 'true',
}) => {
  const matches = className?.match(/language-(?<language>.*)/);
  const language = matches?.groups?.language ?? '';

  return (
    <CodeBox
      language={getLanguageDisplayName(language)}
      CopyButton={showCopyButton === 'true' ? CopyButton : undefined}
    >
      {code}
    </CodeBox>
  );
};

export default MDXCodeBox;
