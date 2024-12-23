import { assignClientContext } from '@/util/assignClientContext';

const mockContext = {
  frontmatter: { title: 'Sample Title' },
  pathname: '/sample-path',
  headings: ['Heading 1', 'Heading 2'],
  readingTime: {
    text: '2 mins read',
    minutes: 2,
    time: 120000,
    words: 200,
  },
  filename: 'sample-file.md',
  os: 'OTHER',
  architecture: 'x64',
  bitness: 64,
};

describe('assignClientContext', () => {
  it('should assign properties to the client context', () => {
    const result = assignClientContext(mockContext);

    expect(result.frontmatter).toEqual(mockContext.frontmatter);
    expect(result.pathname).toEqual(mockContext.pathname);
    expect(result.headings).toEqual(mockContext.headings);
    expect(result.readingTime).toEqual(mockContext.readingTime);
    expect(result.filename).toEqual(mockContext.filename);

    expect(result).toEqual(mockContext);
  });

  it('should use default values for missing properties', () => {
    const result = assignClientContext({});

    expect(result.frontmatter).toEqual({});
    expect(result.pathname).toEqual('');
    expect(result.headings).toEqual([]);
    expect(result.readingTime).toEqual({
      text: '',
      minutes: 0,
      time: 0,
      words: 0,
    });
    expect(result.filename).toEqual('');
  });
});
