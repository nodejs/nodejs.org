import { useTranslations } from 'next-intl';
import type { DetailsHTMLAttributes, FC } from 'react';

import VulnerabilitiesTable from '#site/components/EOL/VulnerabilitiesTable';
import type { UnknownSeverityVulnerability } from '#site/types/vulnerabilities';

type UnknownSeveritySectionProps = DetailsHTMLAttributes<HTMLDetailsElement> & {
  vulnerabilities: Array<UnknownSeverityVulnerability>;
};

const UnknownSeveritySection: FC<UnknownSeveritySectionProps> = ({
  vulnerabilities,
  ...props
}) => {
  const t = useTranslations();

  if (!vulnerabilities.length) {
    return null;
  }

  return (
    <details {...props}>
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
