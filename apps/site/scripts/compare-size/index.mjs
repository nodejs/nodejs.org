import { readFile } from 'node:fs/promises';

/**
 * Formats bytes into human-readable format
 * @param {number} bytes - Number of bytes
 * @returns {string} Formatted string (e.g., "1.5 KB")
 */
const formatBytes = bytes => {
  if (bytes === 0) {
    return '0 B';
  }
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024));
  return (bytes / Math.pow(1024, index)).toFixed(2) + ' ' + units[index];
};

/**
 * Calculates percentage change
 * @param {number} oldValue - Original value
 * @param {number} newValue - New value
 * @returns {string} Formatted percentage
 */
const formatPercent = (oldValue, newValue) => {
  const percent = (((newValue - oldValue) / oldValue) * 100).toFixed(2);
  return `${percent > 0 ? '+' : ''}${percent}%`;
};

/**
 * Categorizes asset changes
 */
const categorizeChanges = (oldAssets, newAssets) => {
  const oldMap = new Map(oldAssets.map(a => [a.name, a]));
  const newMap = new Map(newAssets.map(a => [a.name, a]));
  const changes = { added: [], removed: [], modified: [] };

  for (const [name, oldAsset] of oldMap) {
    const newAsset = newMap.get(name);
    if (!newAsset) {
      changes.removed.push({ name, size: oldAsset.size });
    } else if (oldAsset.size !== newAsset.size) {
      changes.modified.push({
        name,
        oldSize: oldAsset.size,
        newSize: newAsset.size,
        delta: newAsset.size - oldAsset.size,
      });
    }
  }

  for (const [name, newAsset] of newMap) {
    if (!oldMap.has(name)) {
      changes.added.push({ name, size: newAsset.size });
    }
  }

  return changes;
};

/**
 * Builds a collapsible table section
 */
const tableSection = (title, items, columns, icon) => {
  if (!items.length) {
    return '';
  }
  const header = `| ${columns.map(c => c.label).join(' | ')} |\n`;
  const separator = `| ${columns.map(() => '---').join(' | ')} |\n`;
  const rows = items
    .map(item => `| ${columns.map(c => c.format(item)).join(' | ')} |`)
    .join('\n');
  return `<details>\n<summary>${icon} ${title} <strong>(${items.length})</strong></summary>\n\n${header}${separator}${rows}\n\n</details>\n\n`;
};

/**
 * Compares old and new assets and returns a markdown report
 */
function reportDiff({ assets: oldAssets }, { assets: newAssets }) {
  const changes = categorizeChanges(oldAssets, newAssets);

  const oldTotal = oldAssets.reduce((sum, a) => sum + a.size, 0);
  const newTotal = newAssets.reduce((sum, a) => sum + a.size, 0);
  const totalDelta = newTotal - oldTotal;

  // Summary table
  let report = `# 📦 Build Size Comparison\n\n## Summary\n\n| Metric | Value |\n|--------|-------|\n`;
  report += `| Old Total Size | ${formatBytes(oldTotal)} |\n`;
  report += `| New Total Size | ${formatBytes(newTotal)} |\n`;
  report += `| Delta | ${formatBytes(totalDelta)} (${formatPercent(
    oldTotal,
    newTotal
  )}) |\n\n`;

  // Changes
  if (
    changes.added.length ||
    changes.removed.length ||
    changes.modified.length
  ) {
    report += `### Changes\n\n`;

    // Asset tables
    report += tableSection(
      'Added Assets',
      changes.added,
      [
        { label: 'Name', format: a => `\`${a.name}\`` },
        { label: 'Size', format: a => formatBytes(a.size) },
      ],
      '➕'
    );

    report += tableSection(
      'Removed Assets',
      changes.removed,
      [
        { label: 'Name', format: a => `\`${a.name}\`` },
        { label: 'Size', format: a => formatBytes(a.size) },
      ],
      '➖'
    );

    report += tableSection(
      'Modified Assets',
      changes.modified,
      [
        { label: 'Name', format: a => `\`${a.name}\`` },
        { label: 'Old Size', format: a => formatBytes(a.oldSize) },
        { label: 'New Size', format: a => formatBytes(a.newSize) },
        {
          label: 'Delta',
          format: a =>
            `${a.delta > 0 ? '📈' : '📉'} ${formatBytes(
              a.delta
            )} (${formatPercent(a.oldSize, a.newSize)})`,
        },
      ],
      '🔄'
    );
  }

  return report;
}

export async function compare({ core }) {
  const [oldAssets, newAssets] = await Promise.all([
    readFile(process.env.BASE_STATS_PATH).then(f => JSON.parse(f)),
    readFile(process.env.HEAD_STATS_PATH).then(f => JSON.parse(f)),
  ]);

  const comment = reportDiff(oldAssets, newAssets);
  core.setOutput('comment', comment);
}
