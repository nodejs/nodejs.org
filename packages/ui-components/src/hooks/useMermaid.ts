'use client';

import { useEffect, useRef, useState } from 'react';

type MermaidModule = typeof import('@mermanjs/web');

type UseMermaidOptions = {
  /** The Mermaid diagram source. */
  source: string;
  /** The host appearance used for the rendered diagram. */
  theme?: 'light' | 'dark';
  /** Injectable module loader, so unit tests can stub the WASM renderer. */
  loader?: () => Promise<MermaidModule>;
};

const defaultLoader: () => Promise<MermaidModule> = () =>
  import('@mermanjs/web');

/**
 * Renders a Mermaid diagram through the Merman WASM renderer into the
 * returned container ref. Rendering happens lazily on the client, so the
 * WASM module is only loaded when a diagram is actually on the page.
 */
export const useMermaid = ({
  source,
  theme = 'light',
  loader = defaultLoader,
}: UseMermaidOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const renderDiagram = async () => {
      try {
        const merman = await loader();
        await merman.initMerman();

        if (!cancelled && containerRef.current) {
          merman.renderSvgToElement(containerRef.current, source.trim(), {
            host_theme: { appearance: theme },
          });
          setError(null);
        }
      } catch (renderError) {
        if (!cancelled) {
          setError(renderError as Error);
        }
      }
    };

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [source, theme, loader]);

  return { containerRef, error };
};

export default useMermaid;
