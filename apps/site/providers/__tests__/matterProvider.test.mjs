import { render } from '@testing-library/react';

import { MatterProvider, MatterContext } from '@/providers/matterProvider';

const mockContext = {
  frontmatter: {},
  pathname: '',
  headings: [],
  readingTime: { text: '', minutes: 0, time: 0, words: 0 },
  filename: '',
  // @TODO: For some reason the initial value of the provider is flipping between
  // LOADING and OTHER, although the initial state is LOADING, render() might be doing more
  // than just initial rendering; This requires more investigation.
  os: expect.any(String),
  architecture: '',
  bitness: 64,
};

describe('MatterProvider', () => {
  it('renders the provider with the provided context value', () => {
    render(
      <MatterProvider>
        <MatterContext.Consumer>
          {value => {
            expect(value).toEqual(mockContext);
            return null;
          }}
        </MatterContext.Consumer>
      </MatterProvider>
    );
  });
});
