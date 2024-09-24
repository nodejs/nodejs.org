export const pathToBreadcrumbs = (path: string) =>
  path
    .replace(/#.+$/, '')
    .split('/')
    .slice(0, -1)
    .map(element => element.replaceAll('-', ' '))
    .filter(Boolean);
