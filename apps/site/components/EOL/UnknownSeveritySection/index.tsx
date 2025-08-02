import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import VulnerabilitiesTable from '#site/components/EOL/VulnerabilitiesTable';
import type { UnknownSeverityVulnerability } from '#site/types/vulnerabilities';

const UnknownSeveritySection: FC<{
  vulnerabilities: Array<UnknownSeverityVulnerability>;
  hasKnownVulnerabilities: boolean;
}> = ({ vulnerabilities, hasKnownVulnerabilities }) => {
  const t = useTranslations();

  if (!vulnerabilities.length) {
    return null;
  }

  return (
    <details open={!hasKnownVulnerabilities}>
      <summary className="cursor-pointer font-semibold">
        {t('components.eolModal.showUnknownSeverities')} (
        {vulnerabilities.length})
      </summary>
      <div className="mt-4">
        <VulnerabilitiesTable
          vulnerabilities={vulnerabilities}
          maxWidth={'max-w-3xs'}
        />
      </div>
    </details>
  );
};

export default UnknownSeveritySection;
