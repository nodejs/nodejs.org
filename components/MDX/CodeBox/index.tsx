import type { FC, PropsWithChildren } from 'react';

import CodeBox from '@/components/Common/CodeBox';
import { getLanguageDisplayName } from '@/util/getLanguageDisplayName';

type CodeBoxProps = { className?: string };

const MDXCodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({
  children: code,
  className,
}) => {
  const matches = className?.match(/language-(?<language>.*)/);
  const language = matches?.groups?.language ?? '';

  return <CodeBox language={getLanguageDisplayName(language)}>{code}</CodeBox>;
};

export default MDXCodeBox;
