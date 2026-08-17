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
 * Categorizes route bundle size changes.
 */
const categorizeChanges = (oldRoutes, newRoutes) => {
  const oldMap = new Map(oldRoutes.map(r => [r.route, r]));
  const newMap = new Map(newRoutes.map(r => [r.route, r]));
  const changes = { added: [], removed: [], modified: [] };

  for (const [route, oldRoute] of oldMap) {
    const newRoute = newMap.get(route);
    if (!newRoute) {
      changes.removed.push({
        name: route,
        size: oldRoute.firstLoadUncompressedJsBytes,
      });
    } else if (
      oldRoute.firstLoadUncompressedJsBytes !==
      newRoute.firstLoadUncompressedJsBytes
    ) {
      changes.modified.push({
        name: route,
        oldSize: oldRoute.firstLoadUncompressedJsBytes,
        newSize: newRoute.firstLoadUncompressedJsBytes,
        delta:
          newRoute.firstLoadUncompressedJsBytes -
          oldRoute.firstLoadUncompressedJsBytes,
      });
    }
  }

  for (const [route, newRoute] of newMap) {
    if (!oldMap.has(route)) {
      changes.added.push({
        name: route,
        size: newRoute.firstLoadUncompressedJsBytes,
      });
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
 * Compares old and new route bundle stats and returns a markdown report
 */
function reportDiff(oldRoutes, newRoutes) {
  const changes = categorizeChanges(oldRoutes, newRoutes);

  const oldTotal = oldRoutes.reduce(
    (sum, r) => sum + r.firstLoadUncompressedJsBytes,
    0
  );
  const newTotal = newRoutes.reduce(
    (sum, r) => sum + r.firstLoadUncompressedJsBytes,
    0
  );
  const totalDelta = newTotal - oldTotal;

  // Summary table
  let report = `## 📦 Build Size Comparison\n\n### Summary\n\n| Metric | Value |\n|--------|-------|\n`;
  report += `| Old Total First Load JS | ${formatBytes(oldTotal)} |\n`;
  report += `| New Total First Load JS | ${formatBytes(newTotal)} |\n`;
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

    // Route tables
    report += tableSection(
      'Added Routes',
      changes.added,
      [
        { label: 'Route', format: a => `\`${a.name}\`` },
        { label: 'First Load JS', format: a => formatBytes(a.size) },
      ],
      '➕'
    );

    report += tableSection(
      'Removed Routes',
      changes.removed,
      [
        { label: 'Route', format: a => `\`${a.name}\`` },
        { label: 'First Load JS', format: a => formatBytes(a.size) },
      ],
      '➖'
    );

    report += tableSection(
      'Modified Routes',
      changes.modified,
      [
        { label: 'Route', format: a => `\`${a.name}\`` },
        { label: 'Old First Load JS', format: a => formatBytes(a.oldSize) },
        { label: 'New First Load JS', format: a => formatBytes(a.newSize) },
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
  const [oldRoutes, newRoutes] = await Promise.all([
    readFile(process.env.BASE_STATS_PATH).then(f => JSON.parse(f)),
    readFile(process.env.HEAD_STATS_PATH).then(f => JSON.parse(f)),
  ]);

  const comment = reportDiff(oldRoutes, newRoutes);
  core.setOutput('comment', comment);
}
