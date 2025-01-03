import { isSvgImage } from '@/util/imageUtils';

describe('isSvgImage', () => {
  const testCases = [
    {
      description: 'should return true for a valid .svg URL',
      input: 'https://nodejs.org/image.svg',
      expected: true,
    },
    {
      description: 'should return true for a URL with query params',
      input: 'https://nodejs.org/image.svg?query=param',
      expected: true,
    },
    {
      description: 'should return false for a URL without a .svg extension',
      input: 'https://nodejs.org/image',
      expected: false,
    },
    {
      description:
        'should return false for a URL containing ".svg" but not ending with it',
      input: 'https://nodejs.org/image.svg.png',
      expected: false,
    },
    {
      description: 'should return false for an empty string',
      input: '',
      expected: false,
    },
    {
      description: 'should return false for a non-URL string',
      input: 'not-a-url',
      expected: false,
    },
  ];

  testCases.forEach(({ description, input, expected }) => {
    it(description, () => {
      expect(isSvgImage(input)).toBe(expected);
    });
  });
});

describe('imageUtils', () => {
  describe('isSvgImage', () => {
    it('should detect .svg extension properly', () => {
      expect(isSvgImage('icon.svg')).toBe(true);
    });
    it('should return false for non-svg source', () => {
      expect(isSvgImage('logo.png')).toBe(false);
    });
  });
});
