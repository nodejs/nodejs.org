import type { FC, PropsWithChildren } from 'react';

import CodeBox from '#site/components/Common/CodeBox';
import { getLanguageDisplayName } from '#site/util/getLanguageDisplayName';

type CodeBoxProps = { className?: string; showCopyButton?: string };

const MDXCodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({
  children: code,
  className,
  showCopyButton,
}) => {
  const matches = className?.match(/language-(?<language>[a-zA-Z]+)/);
  const language = matches?.groups?.language ?? '';

  return (
    <CodeBox
      language={getLanguageDisplayName(language)}
      showCopyButton={showCopyButton ? showCopyButton === 'true' : undefined}
      className={className}
    >
      {code}
    </CodeBox>
  );
};

export default MDXCodeBox;
