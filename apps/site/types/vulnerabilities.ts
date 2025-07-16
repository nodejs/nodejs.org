export interface Vulnerability {
  cve: Array<string>;
  ref?: string;
  vulnerable: string;
  patched?: string;
  description: string;
  overview: string;
  affectedEnvironments: Array<string>;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'unknown';
}

export interface GroupedVulnerabilities {
  [majorVersion: string]: Array<Vulnerability>;
}
