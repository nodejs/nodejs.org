import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { act, render } from '@testing-library/react';

import { MatterProvider, MatterContext } from '@/providers/matterProvider';

const mockContext = {
  frontmatter: {},
  pathname: '',
  headings: [],
  readingTime: { text: '', minutes: 0, time: 0, words: 0 },
  filename: '',
  os: 'LOADING',
};

describe('MatterProvider', () => {
  it('renders the provider with the provided context value', async () => {
    await act(async () =>
      render(
        <MatterProvider os="LOADING">
          <MatterContext.Consumer>
            {value => {
              assert.partialDeepStrictEqual(value, mockContext);
              assert.equal(typeof value.architecture, 'string');
              assert.equal(typeof value.bitness, 'string');
              return null;
            }}
          </MatterContext.Consumer>
        </MatterProvider>
      )
    );
  });
});
