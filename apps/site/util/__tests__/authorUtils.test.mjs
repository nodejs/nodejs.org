import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  mapAuthorToCardAuthors,
  getAuthorWithId,
  getAuthorWithName,
  getAuthors,
} from '#site/util/authorUtils';

describe('mapAuthorToCardAuthors', () => {
  it('maps authors to card authors with default avatar source', () => {
    const author = 'John Doe';
    const result = mapAuthorToCardAuthors(author);
    assert.deepEqual(result, ['John Doe']);
  });

  it('handles multiple authors separated by various delimiters', () => {
    const author = 'Alice, Bob, Charlie, David';
    const result = mapAuthorToCardAuthors(author);
    assert.deepEqual(result, ['Alice', 'Bob', 'Charlie', 'David']);
  });

  describe('when has more than one author', () => {
    [
      'Timothy J Fontaine, John Doe',
      'Timothy J Fontaine and John Doe',
      'Timothy J Fontaine;John Doe',
      'Timothy J Fontaine & John Doe',
      'Timothy J Fontaine by John Doe',
      'Timothy J Fontaine prepared by John Doe',
      'Timothy J Fontaine (@TimothyJFontaine) & John Doe (@JohnDoe)',
      'Timothy J Fontaine (TimothyJFontaine) & John Doe (JohnDoe)',
    ].forEach(authorInput => {
      it(`correctly parses: "${authorInput}"`, () => {
        const result = mapAuthorToCardAuthors(authorInput);
        assert.deepEqual(result, ['Timothy J Fontaine', 'John Doe']);
      });
    });

    it('returns the correct card authors without GitHub usernames', () => {
      const result = mapAuthorToCardAuthors('John Doe, Jane Doe');
      assert.deepEqual(result, ['John Doe', 'Jane Doe']);
    });

    it('returns the correct card authors with GitHub usernames', () => {
      const result = mapAuthorToCardAuthors('Timothy J Fontaine');
      assert.deepEqual(result, ['Timothy J Fontaine']);
    });
  });
});

describe('getAuthorWithId', () => {
  it('should return author details when author is found', () => {
    const result = getAuthorWithId(['nodejs'], true);
    assert.deepEqual(result, [
      {
        name: 'Node.js Technical Steering Committee',
        nickname: 'nodejs',
        fallback: 'NJTSC',
        url: 'https://github.com/nodejs/tsc',
        image: 'https://avatars.githubusercontent.com/nodejs',
      },
    ]);
  });

  it('returns objects with GitHub avatars', () => {
    const result = getAuthorWithId(['someUser'], false);
    assert.ok(result[0].image.includes('github'));
  });
});

describe('getAuthorWithName', () => {
  it('should return author details when author is found', () => {
    const result = getAuthorWithName(['The Node.js Project'], true);
    assert.deepEqual(result, [
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
    assert.deepEqual(result, [
      {
        nickname: 'Caner Akdas',
        fallback: 'CA',
      },
    ]);
  });

  it('returns known author details or fallback to acronym', () => {
    const result = getAuthorWithName(['unknownAuthor'], true);
    assert.equal(result[0].fallback, 'U');
  });
});

describe('getAuthors', () => {
  it('uses getAuthorWithId if usernames array is provided', () => {
    const result = getAuthors({ usernames: ['testUser'] });
    assert.equal(result[0].nickname, 'testUser');
  });
});

describe('Extra parsing checks', () => {
  it('mapAuthorToCardAuthors splits authors by common separators', () => {
    const result = mapAuthorToCardAuthors('Node, React & prepared by Vue');
    assert.deepEqual(result, ['Node', 'React', 'Vue']);
  });
});
