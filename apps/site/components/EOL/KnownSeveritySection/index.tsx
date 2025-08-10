import type { FC } from 'react';

import VulnerabilitiesTable from '#site/components/EOL/VulnerabilitiesTable';
import type { Vulnerability } from '#site/types/vulnerabilities';

type KnownSeveritySectionProps = {
  vulnerabilities: Array<Vulnerability>;
};

const KnownSeveritySection: FC<KnownSeveritySectionProps> = ({
  vulnerabilities,
}) => {
  const knownVulnerabilities = vulnerabilities.filter(
    v => v.severity !== 'unknown'
  );

  if (!knownVulnerabilities.length) {
    return null;
  }

  return (
    <VulnerabilitiesTable
      vulnerabilities={vulnerabilities.filter(
        vuln => vuln.severity !== 'unknown'
      )}
    />
  );
};

export default KnownSeveritySection;
