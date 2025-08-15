export type Severity = 'unknown' | 'low' | 'medium' | 'high' | 'critical';

export interface Vulnerability {
  cve: Array<string>;
  url?: string;
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
