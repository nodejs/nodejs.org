import { render } from '@testing-library/react';

import { MatterProvider, MatterContext } from '@/providers/matterProvider';

const mockContext = {
  frontmatter: {},
  pathname: '',
  headings: [],
  readingTime: { text: '', minutes: 0, time: 0, words: 0 },
  filename: '',
  os: 'OTHER',
  architecture: 'x64',
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
