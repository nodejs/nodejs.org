import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { hexToRGBA } from '#site/util/hexToRGBA';

describe('hexToRGBA', () => {
  it('should convert a hex color to an rgba color', () => {
    const hexColor = '#000000';
    const rgbaColor = hexToRGBA(hexColor, 0.5);

    assert.equal(rgbaColor, 'rgba(0, 0, 0, 0.5)');
  });

  it('should convert a hex color to an rgba color', () => {
    const hexColor = '#ffffff';
    const rgbaColor = hexToRGBA(hexColor, 0.5);

    assert.equal(rgbaColor, 'rgba(255, 255, 255, 0.5)');
  });

  it('should convert hex to RGBA correctly', () => {
    assert.equal(hexToRGBA('#FFFFFF'), 'rgba(255, 255, 255, 0.9)');
  });

  it('should handle custom alpha value', () => {
    assert.equal(hexToRGBA('#000000', 0.5), 'rgba(0, 0, 0, 0.5)');
  });
});
