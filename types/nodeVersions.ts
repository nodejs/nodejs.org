export interface NodeReleaseSchedule {
  start: string;
  end: string;
}

export interface NodeVersionData {
  node: string;
  nodeMajor: string;
  nodeNumeric: string;
  npm: string;
  isLts: boolean;
}

export interface ExtendedNodeVersionData extends NodeVersionData {
  v8: string;
  openssl: string;
  ltsName: string | null;
  releaseDate: string;
  modules: string;
}
