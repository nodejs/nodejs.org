import { mapAuthorToCardAuthors } from '@/util/blogUtils';

describe('mapAuthorToCardAuthors', () => {
  it('should map authors to card authors with default avatar source', () => {
    const author = 'John Doe';

    const result = mapAuthorToCardAuthors(author);

    expect(result).toEqual([
      {
        fullName: 'John Doe',
        src: 'https://ui-avatars.com/api/?name=John Doe',
      },
    ]);
  });

  it('should handle multiple authors separated by various delimiters', () => {
    const author = 'Alice, Bob, Charlie, David';

    const result = mapAuthorToCardAuthors(author);
    expect(result).toEqual([
      { fullName: 'Alice', src: 'https://ui-avatars.com/api/?name=Alice' },
      { fullName: 'Bob', src: 'https://ui-avatars.com/api/?name=Bob' },
      { fullName: 'Charlie', src: 'https://ui-avatars.com/api/?name=Charlie' },
      { fullName: 'David', src: 'https://ui-avatars.com/api/?name=David' },
    ]);
  });
});
