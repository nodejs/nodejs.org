import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

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
      assert.equal(isSvgImage(input), expected);
    });
  });
});

describe('imageUtils', () => {
  describe('isSvgImage', () => {
    it('should detect .svg extension properly', () => {
      assert.equal(isSvgImage('icon.svg'), true);
    });
    it('should return false for non-svg source', () => {
      assert.equal(isSvgImage('logo.png'), false);
    });
  });
});
