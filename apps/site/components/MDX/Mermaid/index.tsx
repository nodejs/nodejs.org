'use client';

import Mermaid from '@node-core/ui-components/MDX/Mermaid';
import { useTheme } from 'next-themes';

import type { FC } from 'react';

/**
 * Site-level wrapper that maps the next-themes resolved theme onto the
 * shared Mermaid component from @node-core/ui-components.
 */
const MermaidDiagram: FC<{ children: string }> = ({ children }) => {
  const { resolvedTheme } = useTheme();

  return (
    <Mermaid theme={resolvedTheme === 'dark' ? 'dark' : 'light'}>
      {children}
    </Mermaid>
  );
};

export default MermaidDiagram;
