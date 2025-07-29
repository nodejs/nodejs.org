import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import VulnerabilitiesTable from '#site/components/EOL/VulnerabilitiesTable';
import type { Vulnerability } from '#site/types/vulnerabilities';

const UnknownSeveritySection: FC<{
  vulnerabilities: Array<Vulnerability>;
  hasKnownVulns: boolean;
}> = ({ vulnerabilities, hasKnownVulns }) => {
  const t = useTranslations();

  if (!vulnerabilities.length) {
    return null;
  }

  return (
    <details open={!hasKnownVulns}>
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
