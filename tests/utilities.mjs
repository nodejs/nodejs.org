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
