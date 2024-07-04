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
});
