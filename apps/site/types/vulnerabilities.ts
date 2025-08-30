export type Severity = 'unknown' | 'low' | 'medium' | 'high' | 'critical';

export interface RawVulnerability {
  cve: Array<string>;
  ref?: string;
  vulnerable: string;
  patched?: string;
  description: string;
  overview: string;
  affectedEnvironments: Array<string>;
  severity: Severity;
}

export interface Vulnerability extends Omit<RawVulnerability, 'ref'> {
  url?: string;
}

export interface GroupedVulnerabilities {
  [majorVersion: string]: Array<Vulnerability>;
}
