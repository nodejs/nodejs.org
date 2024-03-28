import { mapAuthorToCardAuthors } from '../blogUtils';

describe('mapAuthorToCardAuthors', () => {
  it('returns the correct card authors', () => {
    const result = mapAuthorToCardAuthors(
      'John Doe, Jane Doe',
      'johndoe, janedoe'
    );

    expect(result).toStrictEqual([
      {
        fullName: 'John Doe',
        src: 'https://github.com/johndoe.png?size=40',
      },
      {
        fullName: 'Jane Doe',
        src: 'https://github.com/janedoe.png?size=40',
      },
    ]);
  });
});
