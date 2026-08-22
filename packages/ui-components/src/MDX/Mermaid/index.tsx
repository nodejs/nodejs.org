'use client';

import type { FC } from 'react';

import useMermaid from '../../hooks/useMermaid';

import styles from './index.module.css';


type MermaidProps = {
  /** The Mermaid diagram source. */
  children: string;
  /** The host appearance used for the rendered diagram. */
  theme?: 'light' | 'dark';
};

const Mermaid: FC<MermaidProps> = ({ children, theme = 'light' }) => {
  const { containerRef, error } = useMermaid({
    source: String(children),
    theme,
  });

  if (error) {
    // If the diagram source is invalid, fall back to showing the source
    return (
      <pre className={styles.fallback}>
        <code>{children}</code>
      </pre>
    );
  }

  return <div ref={containerRef} className={styles.mermaid} />;
};

export default Mermaid;
