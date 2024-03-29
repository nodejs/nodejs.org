import { mapAuthorToCardAuthors } from '../blogUtils';

describe('mapAuthorToCardAuthors', () => {
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
