/**
 * Builds stable, URL-safe HTML ids for CodeTabs triggers.
 *
 * Scheme:
 * - With `groupId`: `{slug(groupId)}-{slug(tabKey)}` (e.g. `install-js-0`)
 * - Without: `{slug(instancePrefix)}-{slug(tabKey)}` (e.g. `codetabs-r1-js-0`)
 *
 * `tabKey` is the tab's language/key (MDX already uses `${language}-${index}`).
 * `instancePrefix` is unique per CodeTabs on the page so identical language
 * groups do not collide.
 */
export function slugifyIdSegment(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!slug) {
    return 'tab';
  }

  return /^[a-z]/.test(slug) ? slug : `id-${slug}`;
}

export function getCodeTabId(prefix: string, tabKey: string): string {
  return `${slugifyIdSegment(prefix)}-${slugifyIdSegment(tabKey)}`;
}
