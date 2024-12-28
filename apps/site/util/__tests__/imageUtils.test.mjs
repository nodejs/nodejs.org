import { isSvgImage, resizeImage, cropImage } from '@/util/imageUtils';

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

describe('resizeImage', () => {
  it('should resize the image correctly', () => {
    const image = new Image();
    image.src = 'https://nodejs.org/image.png';
    const width = 100;
    const height = 100;

    const resizedImage = resizeImage(image, width, height);

    expect(resizedImage.width).toBe(width);
    expect(resizedImage.height).toBe(height);
  });

  it('should throw an error for invalid inputs', () => {
    expect(() => resizeImage(null, 100, 100)).toThrow();
    expect(() => resizeImage(new Image(), -100, 100)).toThrow();
    expect(() => resizeImage(new Image(), 100, -100)).toThrow();
  });
});

describe('cropImage', () => {
  it('should crop the image correctly', () => {
    const image = new Image();
    image.src = 'https://nodejs.org/image.png';
    const x = 10;
    const y = 10;
    const width = 50;
    const height = 50;

    const croppedImage = cropImage(image, x, y, width, height);

    expect(croppedImage.width).toBe(width);
    expect(croppedImage.height).toBe(height);
  });

  it('should throw an error for invalid inputs', () => {
    expect(() => cropImage(null, 10, 10, 50, 50)).toThrow();
    expect(() => cropImage(new Image(), -10, 10, 50, 50)).toThrow();
    expect(() => cropImage(new Image(), 10, -10, 50, 50)).toThrow();
    expect(() => cropImage(new Image(), 10, 10, -50, 50)).toThrow();
    expect(() => cropImage(new Image(), 10, 10, 50, -50)).toThrow();
  });
});
