import { useTranslations } from 'next-intl';

import VulnerabilitiesTable from '#site/components/EOL/VulnerabilitiesTable';

import type { Vulnerability } from '#site/types/vulnerabilities';
import type { FC } from 'react';

type UnknownSeveritySectionProps = {
  vulnerabilities: Array<Vulnerability>;
};

const UnknownSeveritySection: FC<UnknownSeveritySectionProps> = ({
  vulnerabilities,
}) => {
  const t = useTranslations();

  const unknownVulnerabilities = vulnerabilities.filter(
    v => v.severity === 'unknown'
  );

  if (!unknownVulnerabilities.length) {
    return null;
  }

  return (
    <details open={unknownVulnerabilities.length === vulnerabilities.length}>
      <summary className="cursor-pointer font-semibold">
        {t('components.eolModal.showUnknownSeverities')} (
        {unknownVulnerabilities.length})
      </summary>
      <div className="mt-4">
        <VulnerabilitiesTable
          vulnerabilities={unknownVulnerabilities}
          maxWidth={'max-w-3xs'}
        />
      </div>
    </details>
  );
};

export default UnknownSeveritySection;
