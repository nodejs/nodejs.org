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

  it('should convert hex to RGBA correctly', () => {
    expect(hexToRGBA('#FFFFFF')).toBe('rgba(255, 255, 255, 0.9)');
  });

  it('should handle custom alpha value', () => {
    expect(hexToRGBA('#000000', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
  });
});
