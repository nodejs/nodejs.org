import fs from 'fs';

export default async function (core, filesList) {
  // Load reviewers mapping
  const reviewersMap = JSON.parse(
    fs.readFileSync('.github/reviewers.json', 'utf8')
  );

  // Parse the file list from the input
  const files = filesList.trim().split(' ').filter(Boolean);

  // Track reviewers we need to mention
  const reviewersToMention = new Set();

  // Process each file
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const apiValues = extractApisFromFrontmatter(content);

    if (apiValues && apiValues.length > 0) {
      for (const apiValue of apiValues) {
        if (reviewersMap[apiValue]) {
          reviewersToMention.add(`- [ ] ${reviewersMap[apiValue]}`);
        }
      }
    }
  }

  // Set outputs
  const reviewersList = Array.from(reviewersToMention);
  core.setOutput('found', reviewersList.length > 0);
  core.setOutput('reviewers', reviewersList.join('\n'));
}

/**
 * Extract API values from frontmatter
 * @returns {string[]} Array of API values found in frontmatter
 */
function extractApisFromFrontmatter(content) {
  if (!content.trimStart().startsWith('---')) {
    return [];
  }

  const firstMarker = content.indexOf('---');
  const secondMarker = content.indexOf('---', firstMarker + 3);

  if (firstMarker === -1 || secondMarker === -1) {
    return [];
  }

  const frontmatterContent = content.substring(firstMarker + 3, secondMarker);

  // Find the api: line
  const apiLineRegex = /^\s*api\s*:\s*(.+)$/m;
  const match = apiLineRegex.exec(frontmatterContent);

  if (!match) return [];

  // Extract all API values, handling various formats
  // This splits by commas and trims each value
  const apiValues = match[1]
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);

  return apiValues;
}
