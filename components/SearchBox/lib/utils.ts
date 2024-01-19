export function pathToBreadcrumbs(path: string) {
  return path
    .replace(/#.+$/, '')
    .split('/')
    .slice(0, -1)
    .map(element => element.replaceAll('-', ' '))
    .filter(Boolean);
}
