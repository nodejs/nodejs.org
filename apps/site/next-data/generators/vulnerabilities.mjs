import { VULNERABILITIES_URL } from '#site/next.constants.mjs';
import { fetchWithRetry } from '#site/util/fetch';

const RANGE_REGEX = /([<>]=?)\s*(\d+)(?:\.(\d+))?/;
const V0_REGEX = /^0\.\d+(\.x)?$/;
const VER_REGEX = /^\d+\.x$/;

/**
 * Fetches vulnerability data from the Node.js Security Working Group repository,
 * and returns it grouped by major version.
 *
 * @returns {Promise<import('#site/types/vulnerabilities').GroupedVulnerabilities>} Grouped vulnerabilities
 */
export default async function generateVulnerabilityData() {
  const response = await fetchWithRetry(VULNERABILITIES_URL);

  /** @type {Array<import('#site/types/vulnerabilities').RawVulnerability>} */
  const data = Object.values(await response.json());

  /** @type {Promise<import('#site/types/vulnerabilities').GroupedVulnerabilities> */
  const grouped = {};

  // Helper function to add vulnerability to a major version group
  const addToGroup = (majorVersion, vulnerability) => {
    grouped[majorVersion] ??= [];
    grouped[majorVersion].push(vulnerability);
  };

  // Helper function to process version patterns
  const processVersion = (version, vulnerability) => {
    // Handle 0.X versions (pre-semver)
    if (V0_REGEX.test(version)) {
      addToGroup('0', vulnerability);

      return;
    }

    // Handle simple major.x patterns (e.g., 12.x)
    if (VER_REGEX.test(version)) {
      const majorVersion = version.split('.')[0];

      addToGroup(majorVersion, vulnerability);

      return;
    }

    // Handle version ranges (>, >=, <, <=)
    const rangeMatch = RANGE_REGEX.exec(version);

    if (rangeMatch) {
      const [, operator, majorVersion] = rangeMatch;

      const majorNum = parseInt(majorVersion, 10);

      switch (operator) {
        case '>=':
        case '>':
        case '<=':
          addToGroup(majorVersion, vulnerability);

          break;
        case '<':
          // Add to all major versions below the specified version
          for (let i = majorNum - 1; i >= 0; i--) {
            addToGroup(i.toString(), vulnerability);
          }

          break;
      }
    }
  };

  for (const { ref, ...vulnerability } of Object.values(data)) {
    vulnerability.url = ref;

    // Process all potential versions from the vulnerable field
    const versions = vulnerability.vulnerable.split(' || ').filter(Boolean);

    for (const version of versions) {
      processVersion(version, vulnerability);
    }
  }

  return grouped;
}
