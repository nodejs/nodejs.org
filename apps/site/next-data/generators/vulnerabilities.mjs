import { VULNERABILITIES_URL } from '#site/next.constants.mjs';

/**
 * Groups vulnerabilities by major version number extracted from the `vulnerable` string.
 *
 * @param {Array<import('#site/types/vulnerabilities').Vulnerability>} vulnerabilities Array of Vulnerability objects
 */
export function groupVulnerabilitiesByMajor(vulnerabilities) {
  const grouped = {};

  for (const vulnerability of vulnerabilities) {
    // split on '||' to handle multiple versions and trim whitespace
    const potentialVersions =
      vulnerability.vulnerable?.split('||').map(v => v.trim()) || [];

    potentialVersions.forEach(version => {
      // handle 0.X versions, which did not follow semver
      // we don't even capture the minor here.
      if (/^0\.\d+(\.x)?$/.test(version)) {
        const majorVersion = '0';
        if (!grouped[majorVersion]) grouped[majorVersion] = [];
        grouped[majorVersion].push(vulnerability);
        return;
      }

      // handle simple cases, where there is no range
      // this is something like 12.x
      if (/^\d+.x/.test(version)) {
        const majorVersion = version.split('.')[0];
        if (!grouped[majorVersion]) grouped[majorVersion] = [];
        grouped[majorVersion].push(vulnerability);
        return;
      }

      // detect if there is a range in the values,
      // which would include a > or < or <= or >=, with spaces
      const rangeMatch = version.match(/([<>]=?)\s*(\d+)?\.?(\d+)?/);
      if (rangeMatch) {
        const operator = rangeMatch[1];

        // if we have equality or greater than, we simply add the current
        // and assume that other piped sections handle any higher bounds
        if (operator === '>=' || operator === '>' || operator === '<=') {
          const majorVersion = rangeMatch[2];
          if (!grouped[majorVersion]) grouped[majorVersion] = [];
          grouped[majorVersion].push(vulnerability);
        }

        // if we only specify (< pr <=) vulnerability,
        // we need to count down from this to all majors!
        if (operator === '<' || operator === '<=') {
          const majorVersion = rangeMatch[2];
          for (let i = majorVersion - 1; i >= 0; i--) {
            if (!grouped[i]) grouped[i] = [];
            grouped[i].push(vulnerability);
          }
          return;
        }
      }
    });
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
  const response = await fetch(VULNERABILITIES_URL);

  const data = await response.json();

  return groupVulnerabilitiesByMajor(Object.values(data));
}
