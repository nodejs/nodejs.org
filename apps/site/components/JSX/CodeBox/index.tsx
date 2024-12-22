import dedent from 'dedent';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import type { FC, PropsWithChildren } from 'react';

import MDXCodeBox from '@/components/MDX/CodeBox';
import { reactRuntime } from '@/next.mdx.evaluater.mjs';
import { highlightToHast, shikiPromise } from '@/util/getHighlighter';

type CodeBoxProps = { language: string; showCopyButton?: string };

const codeToHast = highlightToHast(await shikiPromise);

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = async props => {
  const out = codeToHast(dedent(props.children as string), props.language);
  const className = `language-${props.language}`;

  return toJsxRuntime(out, {
    ...reactRuntime,
    components: {
      pre: ({ children }) => (
        <MDXCodeBox className={className}>{children}</MDXCodeBox>
      ),
    },
  });
};

export default CodeBox;
