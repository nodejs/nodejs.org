export interface ApiChange {
  version: string | string[];
  'pr-url': string;
  description: string;
}

export interface ApiUpdate {
  type: 'added' | 'removed' | 'deprecated' | 'introduced_in' | 'napiVersion';
  version: string[];
}
