import { hexToRGBA } from '@/util/hexToRGBA';

describe('hexToRGBA', () => {
  it('should convert a hex color to an rgba color', () => {
    const hexColor = '#000000';
    const rgbaColor = hexToRGBA(hexColor, 0.5);

    expect(rgbaColor).toBe('rgba(0, 0, 0, 0.5)');
  });

  it('should convert a hex color to an rgba color', () => {
    const hexColor = '#ffffff';
    const rgbaColor = hexToRGBA(hexColor, 0.5);

    expect(rgbaColor).toBe('rgba(255, 255, 255, 0.5)');
  });

  it('should convert a hex color to an rgba color with default alpha', () => {
    const hexColor = '#ff5733';
    const rgbaColor = hexToRGBA(hexColor);

    expect(rgbaColor).toBe('rgba(255, 87, 51, 0.9)');
  });

  it('should handle invalid hex color and return rgba(0, 0, 0, alpha)', () => {
    const hexColor = '#zzzzzz';
    const rgbaColor = hexToRGBA(hexColor, 0.5);

    expect(rgbaColor).toBe('rgba(0, 0, 0, 0.5)');
  });

  it('should handle empty hex color and return rgba(0, 0, 0, alpha)', () => {
    const hexColor = '';
    const rgbaColor = hexToRGBA(hexColor, 0.5);

    expect(rgbaColor).toBe('rgba(0, 0, 0, 0.5)');
  });
});
