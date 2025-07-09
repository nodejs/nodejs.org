export interface DownloadSnippet {
  name: string;
  language: string;
  content: string;
}

export type DownloadKind = 'installer' | 'binary' | 'source';
