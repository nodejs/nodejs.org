/**
 * Whether a value is a YAML mapping (a plain object).
 *
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
export const isMapping = value =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * The successfully parsed YAML metadata blocks of a document.
 *
 * @param {import('../context.mjs').Context} context
 * @returns {Array<import('../context.mjs').Comment & { yaml: Record<string, unknown> }>}
 */
export const getYamlBlocks = context =>
  context.comments.filter(
    comment => comment.kind === 'yaml' && isMapping(comment.yaml)
  );

/**
 * Whether a change predates the change-record format (Node.js < 1.0), so it
 * has no pull request to reference.
 *
 * @param {Record<string, unknown>} change
 */
export const isAncientChange = change =>
  [change.version]
    .flat()
    .some(version => typeof version === 'string' && version.startsWith('v0.'));

/**
 * The `changes` records of a YAML block that are mappings, with their index.
 *
 * @param {Record<string, unknown>} yaml
 * @returns {Array<[index: number, change: Record<string, unknown>]>}
 */
export const getChanges = yaml =>
  Array.isArray(yaml.changes)
    ? yaml.changes.flatMap((change, index) =>
        isMapping(change) ? [[index, change]] : []
      )
    : [];
