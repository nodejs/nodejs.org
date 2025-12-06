import { VULNERABILITIES_URL } from '#site/next.constants.mjs';

const RANGE_REGEX = /([<>]=?)\s*(\d+)(?:\.(\d+))?/;

/**
 * Fetches vulnerability data from the Node.js Security Working Group repository,
 * and returns it grouped by major version.
 *
 * @returns {Promise<import('#site/types/vulnerabilities').GroupedVulnerabilities>} Grouped vulnerabilities
 */
export default () =>
  fetch(VULNERABILITIES_URL)
    .then(response => response.json())
    .then(payload => {
      /** @type {Array<import('#site/types/vulnerabilities').RawVulnerability>} */
      const data = Object.values(payload);

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
        if (/^0\.\d+(\.x)?$/.test(version)) {
          addToGroup('0', vulnerability);

          return;
        }

        // Handle simple major.x patterns (e.g., 12.x)
        if (/^\d+\.x$/.test(version)) {
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
    })
    .catch(() => ({}));
