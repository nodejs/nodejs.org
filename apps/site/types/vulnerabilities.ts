export type Severity = 'unknown' | 'low' | 'medium' | 'high' | 'critical';

export type RawVulnerability = {
  cve: Array<string>;
  ref?: string;
  vulnerable: string;
  patched?: string;
  description: string;
  overview: string;
  affectedEnvironments: Array<string>;
  severity: Severity;
};

export type Vulnerability = {
  url?: string;
} & Omit<RawVulnerability, 'ref'>;

export type GroupedVulnerabilities = Record<string, Array<Vulnerability>>;
