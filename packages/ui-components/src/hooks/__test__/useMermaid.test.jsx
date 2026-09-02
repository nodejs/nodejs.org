import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { render, screen, waitFor } from '@testing-library/react';

import useMermaid from '../useMermaid';

const fakeMermaidModule = {
  initMerman: async () => ({}),
  renderSvgToElement: (target, source) => {
    target.innerHTML = `<svg data-diagram="${source}"></svg>`;
  },
};

const TestComponent = ({ source, loader }) => {
  const { containerRef, error } = useMermaid({ source, loader });

  return (
    <div data-testid="container">
      {error ? 'error' : ''}
      <div ref={containerRef} data-testid="diagram" />
    </div>
  );
};

await describe('useMermaid', async () => {
  await it('renders the diagram through the injected loader', async () => {
    render(
      <TestComponent
        source="graph TD; A-->B;"
        loader={async () => fakeMermaidModule}
      />
    );

    await waitFor(() =>
      assert.ok(
        screen.getByTestId('diagram').innerHTML.includes('<svg'),
        'expected the diagram SVG to be rendered'
      )
    );
  });

  await it('surfaces loader failures as an error state', async () => {
    const failingLoader = async () => {
      throw new Error('wasm failed to load');
    };

    render(<TestComponent source="graph TD; A-->B;" loader={failingLoader} />);

    await waitFor(() =>
      assert.ok(screen.getByTestId('container').textContent.includes('error'))
    );
  });
});
