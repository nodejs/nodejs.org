// This helper checks if a given element is visible.
// Asserting the output of this is the equal of running
// expect(element).toBeVisible()
export function isVisible(element) {
  while (element) {
    const style = element.ownerDocument.defaultView.getComputedStyle(element);
    if (
      style.display === 'none' ||
      style.visibility === 'hidden' ||
      style.visibility === 'collapse' ||
      style.opacity === '0' ||
      style.opacity === 0 ||
      element.hasAttribute('hidden')
    ) {
      return false;
    }
    element = element.parentElement;
  }
  return true;
}
