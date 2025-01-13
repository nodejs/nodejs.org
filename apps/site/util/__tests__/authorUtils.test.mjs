import {
  mapAuthorToCardAuthors,
  getAuthorWithId,
  getAuthorWithName,
  getAuthors,
} from '@/util/authorUtils';

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
      ['Timothy J Fontaine (@TimothyJFontaine) & John Doe (@JohnDoe)'],
      ['Timothy J Fontaine (TimothyJFontaine) & John Doe (JohnDoe)'],
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
    const result = getAuthorWithId(['nodejs'], true);

    expect(result).toEqual([
      {
        name: 'The Node.js Project',
        nickname: 'nodejs',
        fallback: 'TNJP',
        url: 'https://github.com/nodejs',
        image: 'https://avatars.githubusercontent.com/nodejs',
      },
    ]);
  });
});

describe('getAuthorWithName', () => {
  it('should return author details when author is found', () => {
    const result = getAuthorWithName(['The Node.js Project'], true);

    expect(result).toEqual([
      {
        name: 'The Node.js Project',
        nickname: 'nodejs',
        fallback: 'TNJP',
        url: 'https://github.com/nodejs',
        image: 'https://avatars.githubusercontent.com/nodejs',
      },
    ]);
  });

  it('should return fallback details when author is not found', () => {
    const result = getAuthorWithName(['Caner Akdas'], true);

    expect(result).toEqual([
      {
        nickname: 'Caner Akdas',
        fallback: 'CA',
      },
    ]);
  });
});

describe('authorUtils', () => {
  test('mapAuthorToCardAuthors splits authors by common separators', () => {
    const result = mapAuthorToCardAuthors('Node, React & prepared by Vue');
    expect(result).toEqual(['Node', 'React', 'Vue']);
  });

  test('getAuthorWithId returns objects with GitHub avatars', () => {
    const result = getAuthorWithId(['someUser'], false);
    expect(result[0].image).toContain('github');
  });

  test('getAuthorWithName returns known author details or fallback to acronym', () => {
    const result = getAuthorWithName(['unknownAuthor'], true);
    expect(result[0].fallback).toBe('U');
  });

  test('getAuthors uses getAuthorWithId if usernames array is provided', () => {
    const result = getAuthors({ usernames: ['testUser'] });
    expect(result[0].nickname).toBe('testUser');
  });
});
