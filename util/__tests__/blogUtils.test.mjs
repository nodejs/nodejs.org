import { mapAuthorToCardAuthors } from '../blogUtils';

describe('mapAuthorToCardAuthors', () => {
  it('maps authors to card authors with default avatar source', () => {
    const author = 'John Doe';

    const result = mapAuthorToCardAuthors(author);

    expect(result).toEqual([
      {
        fullName: 'John Doe',
        src: 'https://ui-avatars.com/api/?name=John Doe',
      },
    ]);
  });

  it('handles multiple authors separated by various delimiters', () => {
    const author = 'Alice, Bob, Charlie, David';

    const result = mapAuthorToCardAuthors(author);
    expect(result).toEqual([
      { fullName: 'Alice', src: 'https://ui-avatars.com/api/?name=Alice' },
      { fullName: 'Bob', src: 'https://ui-avatars.com/api/?name=Bob' },
      { fullName: 'Charlie', src: 'https://ui-avatars.com/api/?name=Charlie' },
      { fullName: 'David', src: 'https://ui-avatars.com/api/?name=David' },
    ]);
  });

  describe('when has more than one author', () => {
    it.each([
      ['Timothy J Fontaine, John Doe'],
      ['Timothy J Fontaine and John Doe'],
      ['Timothy J Fontaine;John Doe'],
      ['Timothy J Fontaine & John Doe'],
      ['Timothy J Fontaine by John Doe'],
      ['Timothy J Fontaine prepared by John Doe'],
    ])('returns the correct card authors', author => {
      const result = mapAuthorToCardAuthors(author);

      expect(result).toStrictEqual([
        {
          fullName: 'Timothy J Fontaine',
          src: 'https://avatars.githubusercontent.com/tjfontaine',
        },
        {
          fullName: 'John Doe',
          src: 'https://ui-avatars.com/api/?name=John Doe',
        },
      ]);
    });
  });

  describe('when the author name does not have GitHub username', () => {
    it('returns the correct card authors', () => {
      const result = mapAuthorToCardAuthors('John Doe, Jane Doe');

      expect(result).toStrictEqual([
        {
          fullName: 'John Doe',
          src: 'https://ui-avatars.com/api/?name=John Doe',
        },
        {
          fullName: 'Jane Doe',
          src: 'https://ui-avatars.com/api/?name=Jane Doe',
        },
      ]);
    });
  });

  describe('when the author name has GitHub username', () => {
    it('returns the correct card authors', () => {
      const result = mapAuthorToCardAuthors('Timothy J Fontaine');

      expect(result).toStrictEqual([
        {
          fullName: 'Timothy J Fontaine',
          src: 'https://avatars.githubusercontent.com/tjfontaine',
        },
      ]);
    });
  });
});
