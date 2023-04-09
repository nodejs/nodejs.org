import {
  computeDropdownStyles,
  exptraLeftValue,
  exptraTopValue,
} from '../computeDropdownStyles';

describe('computeDropdownStyles', () => {
  const outerElementPosition = {
    x: 200,
    y: 200,
    width: 100,
    height: 100,
  };
  const dropdownWidth = 50;

  it('should be defined', (): void => {
    expect(computeDropdownStyles).toBeDefined();
  });

  it('should calculate correct and be visible', (): void => {
    const listStyle = computeDropdownStyles(
      outerElementPosition,
      dropdownWidth,
      true
    );
    expect(listStyle).toEqual({
      left:
        outerElementPosition.x -
        dropdownWidth +
        outerElementPosition.width -
        exptraLeftValue,
      top:
        outerElementPosition.y + outerElementPosition.height - exptraTopValue,
      visibility: 'visible',
    });
  });

  it('should be hidden', (): void => {
    const listStyle = computeDropdownStyles(
      outerElementPosition,
      dropdownWidth,
      false
    );
    expect(listStyle.visibility).toBe('hidden');
  });
});
