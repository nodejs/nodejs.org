import mermaid from 'mermaid';

import { createMermaidRenderer } from 'mermaid-isomorphic';

mermaid.initialize({
  fontFamily: 'arial,sans-serif',
});

Object.assign(globalThis, { createMermaidRenderer });
