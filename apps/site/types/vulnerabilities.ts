import type { SEVERITY_ORDER } from '#site/next.constants.mjs';
import type { NodeRelease } from '#site/types';

export type Severity = 'unknown' | 'low' | 'medium' | 'high' | 'critical';
export interface Vulnerability {
  cve: Array<string>;
  ref?: string;
  vulnerable: string;
  patched?: string;
  description: string;
  overview: string;
  affectedEnvironments: Array<string>;
  severity: Severity;
}

export interface GroupedVulnerabilities {
  [majorVersion: string]: Array<Vulnerability>;
}

export type VulnerabilityChipsProps = {
  vulnerabilities: Array<Vulnerability>;
};

export type VulnerabilityChipProps = {
  severity: Severity;
  count?: number;
};

export type EOLModalData = {
  release: NodeRelease;
  vulnerabilities: Array<Vulnerability>;
};

export type KnownVulnerability = Vulnerability & {
  severity: (typeof SEVERITY_ORDER)[number];
};

export type UnknownSeverityVulnerability = Vulnerability & {
  severity: 'unknown';
};
