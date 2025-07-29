/**
 * Groups vulnerabilities by major version number extracted from the `vulnerable` string.
 *
 * @param {Array<import('#site/types/vulnerabilities').Vulnerability>} vulnerabilities Array of Vulnerability objects
 */
function groupVulnerabilitiesByMajor(vulnerabilities) {
  const grouped = {};

  for (const vulnerability of vulnerabilities) {
    const majorVersions =
      vulnerability.vulnerable
        .match(/\b\d+\b/g)
        ?.map(Number)
        .filter(major => !isNaN(major)) ?? [];

    for (const majorVersion of majorVersions) {
      const key = majorVersion.toString();
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(vulnerability);
    }
  }

  return grouped;
}

/**
 * Fetches vulnerability data from the Node.js Security Working Group repository,
 * and returns it grouped by major version.
 *
 * @returns {Promise<import('#site/types/vulnerabilities').GroupedVulnerabilities>} Grouped vulnerabilities
 */
export default async function generateVulnerabilityData() {
  const response = await fetch(
    'https://raw.githubusercontent.com/nodejs/security-wg/main/vuln/core/index.json'
  );

  const data = await response.json();

  return groupVulnerabilitiesByMajor(Object.values(data));
}
