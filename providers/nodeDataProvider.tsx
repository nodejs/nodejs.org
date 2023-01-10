import { createContext, useEffect, useState } from 'react';
// @ts-ignore no-def sadly there's no typing for this package
import nodeVersionData from 'node-version-data';
import type { PropsWithChildren } from 'react';

import type { NodeVersionData, NodeReleaseSchedule } from '../types';
import { getMajorVersion } from '../util/getSemVerInfo';

type ReleaseSchedulePayload = Record<string, NodeReleaseSchedule>;

type NodeVersionDataPayload = Array<{
  version: string;
  date: string;
  files: Array<string>;
  npm: string;
  v8: string;
  uv: string;
  zlib: string;
  openssl: string;
  modules: string;
  lts: boolean;
  name: string;
  url: string;
}>;

const nodeScheduleDataPromise = fetch(
  'https://raw.githubusercontent.com/nodejs/Release/master/schedule.json'
).then(response => response.json() as Promise<ReleaseSchedulePayload>);

const nodeVersionDataPromise = new Promise<NodeVersionDataPayload>(resolve =>
  nodeVersionData((_: Error, versions: NodeVersionDataPayload) =>
    resolve(versions)
  )
);

export const NodeDataContext = createContext<NodeVersionData[]>([]);

export const NodeDataProvider = ({ children }: PropsWithChildren) => {
  const [nodeData, setNodeData] = useState<NodeVersionData[]>([]);

  useEffect(() => {
    // @TODO: This is a temporary approach until we get Nextra.js with `getStaticProps` for `theme.jsx`
    Promise.all([nodeScheduleDataPromise, nodeVersionDataPromise])
      .then(([schedule, versions]) =>
        versions.map(version => ({
          node: version.version,
          nodeMajor: getMajorVersion(version.version),
          npm: version.npm,
          v8: version.v8,
          openssl: version.openssl,
          isLts: version.lts,
          schedule: schedule[version.version.replace('.x', '')],
        }))
      )
      .then(setNodeData);
  }, []);

  return (
    <NodeDataContext.Provider value={nodeData}>
      {children}
    </NodeDataContext.Provider>
  );
};
