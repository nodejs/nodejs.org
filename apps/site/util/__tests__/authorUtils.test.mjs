import {
  mapAuthorToCardAuthors,
  getAuthorWithId,
  getAuthorWithName,
} from '../authorUtils';

describe('mapAuthorToCardAuthors', () => {
  it('maps authors to card authors with default avatar source', () => {
    const author = 'John Doe';

    const result = mapAuthorToCardAuthors(author);

    expect(result).toEqual(['John Doe']);
  });

  it('handles multiple authors separated by various delimiters', () => {
    const author = 'Alice, Bob, Charlie, David';

    const result = mapAuthorToCardAuthors(author);
    expect(result).toEqual(['Alice', 'Bob', 'Charlie', 'David']);
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

      expect(result).toStrictEqual(['Timothy J Fontaine', 'John Doe']);
    });
  });

  describe('when the author name does not have GitHub username', () => {
    it('returns the correct card authors', () => {
      const result = mapAuthorToCardAuthors('John Doe, Jane Doe');

      expect(result).toStrictEqual(['John Doe', 'Jane Doe']);
    });
  });

  describe('when the author name has GitHub username', () => {
    it('returns the correct card authors', () => {
      const result = mapAuthorToCardAuthors('Timothy J Fontaine');

      expect(result).toStrictEqual(['Timothy J Fontaine']);
    });
  });
});

describe('getAuthorWithId', () => {
  it('should return author details when author is found', () => {
    const result = getAuthorWithId(['nodejs']);

    expect(result).toEqual([
      {
        name: 'The Node.js Project',
        nickname: 'nodejs',
        fallback: 'TNJP',
        website: 'https://github.com/nodejs',
        image: 'https://avatars.githubusercontent.com/nodejs',
      },
    ]);
  });

  it('should return fallback image when author is not found and fallbackImage is true', () => {
    const result = getAuthorWithId(['canerakdas'], true);

    expect(result).toEqual([
      {
        nickname: 'canerakdas',
        fallback: 'C',
        image: 'https://avatars.githubusercontent.com/canerakdas',
        website: 'https://github.com/canerakdas',
      },
    ]);
  });

  it('should not return fallback image when author is not found and fallbackImage is false', () => {
    const result = getAuthorWithId(['canerakdas']);

    expect(result).toEqual([
      {
        nickname: 'canerakdas',
        fallback: 'C',
        website: 'https://github.com/canerakdas',
      },
    ]);
  });
});

describe('getAuthorWithName', () => {
  it('should return author details when author is found', () => {
    const result = getAuthorWithName(['The Node.js Project']);

    expect(result).toEqual([
      {
        name: 'The Node.js Project',
        nickname: 'nodejs',
        fallback: 'TNJP',
        website: 'https://github.com/nodejs',
        image: 'https://avatars.githubusercontent.com/nodejs',
      },
    ]);
  });

  it('should return fallback details when author is not found', () => {
    const result = getAuthorWithName(['Caner Akdas']);

    expect(result).toEqual([
      {
        nickname: 'Caner Akdas',
        fallback: 'CA',
      },
    ]);
  });
});
