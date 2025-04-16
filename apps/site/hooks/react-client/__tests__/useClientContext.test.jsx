import { renderHook } from '@testing-library/react';

import useClientContext from '@/hooks/react-client/useClientContext';
import { MatterContext } from '@/providers/matterProvider';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('useClientContext', () => {
  it('should return client context values', () => {
    const mockContextValue = {
      pathname: '/example-path',
      frontmatter: { title: 'Example Title', date: '2024-02-17' },
      headings: ['Heading 1', 'Heading 2'],
      readingTime: 5,
      filename: 'example.md',
    };

    const wrapper = ({ children }) => (
      <MatterContext.Provider value={mockContextValue}>
        {children}
      </MatterContext.Provider>
    );

    const { result } = renderHook(() => useClientContext(), { wrapper });

    assert.partialDeepStrictEqual(result.current, mockContextValue);
  });
});
