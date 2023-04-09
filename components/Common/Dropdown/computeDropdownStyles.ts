import type { ElementPositionAndSize } from '../../../hooks/useElementPositionAndSize';

export const exptraLeftValue = 10;
export const exptraTopValue = 15;

export const computeDropdownStyles = (
  outerElement: ElementPositionAndSize,
  dropdownWidth: number,
  shouldShow: boolean
) => {
  // this calculation is done by using the initial position of the reference element
  // minus the width of the dropdown and minus an extra coefficient to account for
  // which results on the dropdown hovering exactly where the element starts
  // @TODO introduce a calculation of where the element should render (before or after the element)
  // @TODO for very small screens the dropdown should fill the whole screen
  const left =
    outerElement.x - dropdownWidth + outerElement.width - exptraLeftValue;

  // this calculation is done by using the initial position of the reference element
  // plus the height of the reference element minus an extra coefficient to account for
  // which results on the dropdown hovering exactly below where the element starts
  // note.: this doesn't check if the window height is big enough to handle the dropdown
  // @TODO introduce a calculation of where the element should render (above or below the element)
  // @TODO for very small screens the dropdown should fill the whole screen
  const top = outerElement.y + outerElement.height - exptraTopValue;

  // We don't need to make the element completely invisibile (display: none) just hiding it
  // should be more than enough to hide the element
  const visibility: 'visible' | 'hidden' = shouldShow ? 'visible' : 'hidden';

  return { left, top, visibility };
};
