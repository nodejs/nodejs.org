import { cache } from 'react';

export interface Vulnerability {
  cve: Array<string>;
  ref?: string;
  vulnerable: string;
  patched?: string;
  description: string;
  overview: string;
  affectedEnvironments: Array<string>;
  severity: string;
}

interface GroupedVulnerabilities {
  [majorVersion: string]: Array<Vulnerability>;
}

/**
 * Vulnerability data looks like this:
 *
 *
 * [
  * "1": {
      "cve": [
        "CVE-2017-1000381"
      ],
      "ref": "https://nodejs.org/en/blog/vulnerability/july-2017-security-releases/",
      "vulnerable": "8.x || 7.x || 4.x || 6.x || 5.x",
      "patched": "^8.1.4 || ^7.10.1 || ^4.8.4 || ^6.11.1",
      "description": "memory overread when parsing invalid NAPTR responses",
      "overview": "The c-ares function ares_parse_naptr_reply(), which is used for parsing NAPTR\nresponses, could be triggered to read memory outside of the given input buffer\nif the passed in DNS response packet was crafted in a particular way.\n\n",
      "affectedEnvironments": [
        "all"
      ],
      "severity": "unknown"
    },
    "2": {
      "cve": [],
      "vulnerable": "4.x || 5.x || 6.x || 7.x || 8.x",
      "patched": "^4.8.4 || ^6.11.1 || ^7.10.1 || ^8.1.4",
      "description": "DoS possible in V8 object lookup",
      "overview": "Disable V8 snapshots - The hashseed embedded in the snapshot is\ncurrently the same for all runs of the binary. This opens node up to\ncollision attacks which could result in a Denial of Service. We have\ntemporarily disabled snapshots until a more robust solution is found\nFixed: Ali Ijaz Sheikh\nReported: Fedor Indutny\nref: https://nodejs.org/en/blog/vulnerability/july-2017-security-releases/\n\n",
      "affectedEnvironments": [
        "all"
      ],
      "severity": "unknown"
  }
]
 * TODO: @bmuenzenmeyer Better document
 * @param vulnerabilities
 */

const groupVulnerabilitiesByMajor = (
  vulnerabilities: Array<Vulnerability>
): GroupedVulnerabilities => {
  const grouped: GroupedVulnerabilities = {};

  Object.values(vulnerabilities).forEach(vulnerability => {
    // `vulnerable` value can look as complicated as >=6.0.0 <6.2.0 || 5.x || 4.x
    // extract just the major versions, which is the unique first integer before any dot
    // e.g. 6, 5, 4
    // use a regex to get the integers and ignore the potential ranges
    // e.g. >=6.0.0 <6.2.0 will be parsed as 6
    //       5.x will be parsed as 5
    //       6.0.0 will be parsed as 6
    //       6.2.0 will be parsed as 6
    const majorVersions =
      vulnerability.vulnerable
        .match(/\d+/g)
        ?.map(Number)
        .filter(major => !isNaN(major)) || [];

    majorVersions.forEach(majorVersion => {
      if (!grouped[majorVersion]) {
        grouped[majorVersion] = [];
      }
      grouped[majorVersion].push(vulnerability);
    });
  });

  return grouped;
};

const provideVulnerabilities = cache(async () => {
  const data = await fetchVulnerabilities();

  // group by major version
  const groupedData = groupVulnerabilitiesByMajor(data);

  return groupedData;
});

/**
 * TODO: @bmuenzenmeyer We need to extend the same data loading patterns at next-data/ to account for static generation.
 * This is a good place for others to extensively review what I've done here.
 */
export default provideVulnerabilities;

async function fetchVulnerabilities() {
  const response = await fetch(
    'https://raw.githubusercontent.com/nodejs/security-wg/main/vuln/core/index.json'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch vulnerabilities data');
  }

  const data = await response.json();
  return data;
}
