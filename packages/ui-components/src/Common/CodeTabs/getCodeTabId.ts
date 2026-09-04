/**
 * Builds stable, URL-safe HTML ids for CodeTabs triggers.
 *
 * Scheme:
 * The index keeps distinct keys unique even when their slugs are equal.
 * The prefix is prepared by CodeTabs; preserve case in React-generated ids.
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

export function getCodeTabId(
  prefix: string,
  tabKey: string,
  index: number
): string {
  return `${prefix}-${slugifyIdSegment(tabKey)}-${index}`;
}
