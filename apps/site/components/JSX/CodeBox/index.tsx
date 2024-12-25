import classNames from 'classnames';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import type { FC, PropsWithChildren } from 'react';

import MDXCodeBox from '@/components/MDX/CodeBox';
import { reactRuntime } from '@/next.mdx.compiler.mjs';
import { highlightToHast } from '@/util/getHighlighter';

type CodeBoxProps = {
  language: string;
  showCopyButton?: boolean;
  className?: string;
};

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({
  children,
  language,
  showCopyButton,
  className,
}) => {
  const highlighted = highlightToHast(String(children), language);

  return toJsxRuntime(highlighted, {
    ...reactRuntime,
    components: {
      pre: ({ children }) => (
        <MDXCodeBox
          showCopyButton={showCopyButton ? 'true' : undefined}
          className={classNames(`language-${language}`, className)}
        >
          {children}
        </MDXCodeBox>
      ),
    },
  });
};

export default CodeBox;
